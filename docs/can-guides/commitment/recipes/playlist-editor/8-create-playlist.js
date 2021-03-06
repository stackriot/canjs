import {
  addJQueryEvents,
  Control,
  domData,
  domEvents,
  ObservableArray,
  StacheElement,
  type,
  viewCallbacks
} from "//unpkg.com/can@6/core.mjs";

addJQueryEvents(jQuery);

const Sortable = Control.extend({
  "{element} dropinit": function() {
    this.droppedOn = false;
  },
  "{element} dropmove": function(el, ev, drop, drag) {
    this.fireEventForDropPosition(ev, drop, drag, "sortableplaceholderat");
  },
  "{element} dropon": function(el, ev, drop, drag) {
    this.droppedOn = true;
    this.fireEventForDropPosition(ev, drop, drag, "sortableinsertat");
  },
  "{element} dropend": function(el, ev, drop, drag) {
    if (!this.droppedOn) {
      drag.revert();
    }
  },
  fireEventForDropPosition(ev, drop, drag, eventName) {
    const dragData = domData.get(drag.element[0], "dragData");
    const sortables = $(this.element).children();

    for (var i = 0; i < sortables.length; i++) {
      //check if cursor is past 1/2 way
      const sortable = $(sortables[i]);
      if (
        ev.pageY < Math.floor(sortable.offset().top + sortable.height() / 2)
      ) {
        // index at which it needs to be inserted before
        domEvents.dispatch(this.element, {
          type: eventName,
          index: i,
          dragData: dragData
        });
        return;
      }
    }
    if (!sortables.length) {
      domEvents.dispatch(this.element, {
        type: eventName,
        index: 0,
        dragData: dragData
      });
    } else {
      domEvents.dispatch(this.element, {
        type: eventName,
        index: i,
        dragData: dragData
      });
    }
  }
});

viewCallbacks.attr("sortable", el => {
  new Sortable(el);
});

class PlaylistEditor extends StacheElement {
  static view = `
    {{# if(this.googleApiLoadedPromise.isPending) }}
        <div>Loading Google API…</div>
    {{ else }}
      {{# if(this.signedIn) }}
        Welcome {{ this.givenName }}! <button on:click="this.googleAuth.signOut()">Sign Out</button>
      {{ else }}
        <button on:click="this.googleAuth.signIn()">Sign In</button>
      {{/ if }}

      <div>
        <input value:bind="this.searchQuery" placeholder="Search for videos">
      </div>

      {{# if(this.searchResultsPromise.isPending) }}
        <div class="loading">Loading videos…</div>
      {{/ if }}

      {{# if(this.searchResultsPromise.isResolved) }}
        <ul class="source">
          {{# for(searchResult of this.searchResultsPromise.value) }}
            <li 
              on:draginit="this.videoDrag(scope.arguments[1])"
              {{ domData("dragData", searchResult) }}
            >
              <a draggable="false" href="https://www.youtube.com/watch?v={{ searchResult.id.videoId }}" target='_blank'>
                <img draggable="false" src="{{ searchResult.snippet.thumbnails.default.url }}" width="50px">
              </a>
              {{ searchResult.snippet.title }}
            </li>
          {{/ for }}
        </ul>

        {{# if(this.searchResultsPromise.value.length) }}
          <div class="new-playlist">
            <ul
              sortable
              on:sortableplaceholderat="this.addDropPlaceholder(scope.event.index, scope.event.dragData)"
              on:sortableinsertat="this.addVideo(scope.event.index, scope.event.dragData)"
              on:dropout="this.clearDropPlaceholder()"
            >
              {{# for(videoWithDropPlaceholder of this.videosWithDropPlaceholder) }}
                <li class="{{# if(videoWithDropPlaceholder.isPlaceholder) }}placeholder{{/ if }}">
                  <a href="https://www.youtube.com/watch?v={{ videoWithDropPlaceholder.video.id.videoId }}" target='_blank'>
                    <img src="{{ videoWithDropPlaceholder.video.snippet.thumbnails.default.url }}" width="50px">
                  </a>
                  {{ videoWithDropPlaceholder.video.snippet.title }}
                </li>
              {{else}}
                <div class="content">Drag video here</div>
              {{/ for }}
            </ul>
            {{# if(this.playlistVideos.length) }}
              <button 
                on:click="this.createPlaylist()"
                disabled:from="this.createPlaylistPromise.isPending()"
              >
                Create Playlist
              </button>
            {{/ if }}
          </div>
        {{/ if }}

      {{/ if }}
    {{/ if }}
  `;

  static props = {
    signedIn: Boolean,

    googleApiLoadedPromise: {
      get default() {
        return googleApiLoadedPromise;
      }
    },

    googleAuth: {
      async(resolve) {
        this.googleApiLoadedPromise.then(() => {
          resolve(gapi.auth2.getAuthInstance());
        });
      }
    },

    searchQuery: "",

    dropPlaceholderData: type.Any,

    playlistVideos: {
      get default() {
        return new ObservableArray();
      }
    },

    createPlaylistPromise: type.Any,

    get givenName() {
      return (
        this.googleAuth &&
        this.googleAuth.currentUser
          .get()
          .getBasicProfile()
          .getGivenName()
      );
    },

    get searchResultsPromise() {
      if (this.searchQuery.length > 2) {
        return gapi.client.youtube.search
          .list({
            q: this.searchQuery,
            part: "snippet",
            type: "video"
          })
          .then(response => {
            console.info("Search results:", response.result.items);
            return response.result.items;
          });
      }
    },

    get videosWithDropPlaceholder() {
      const copy = this.playlistVideos.map(video => {
        return {
          video: video,
          isPlaceholder: false
        };
      });
      if (this.dropPlaceholderData) {
        copy.splice(this.dropPlaceholderData.index, 0, {
          video: this.dropPlaceholderData.video,
          isPlaceholder: true
        });
      }
      return copy;
    }
  };

  connected() {
    this.listenTo("googleAuth", ({ value: googleAuth }) => {
      this.signedIn = googleAuth.isSignedIn.get();
      googleAuth.isSignedIn.listen(isSignedIn => {
        this.signedIn = isSignedIn;
      });
    });

    this.listenTo("createPlaylistPromise", ({ value: promise }) => {
      if (promise) {
        promise.then(() => {
          this.playlistVideos = [];
          this.createPlaylistPromise = null;
        });
      }
    });
  }

  videoDrag(drag) {
    drag.ghost().addClass("ghost");
  }

  getDragData(drag) {
    return domData.get(drag.element[0], "dragData");
  }

  addDropPlaceholder(index, video) {
    this.dropPlaceholderData = {
      index: index,
      video: video
    };
  }

  clearDropPlaceholder() {
    this.dropPlaceholderData = null;
  }

  addVideo(index, video) {
    this.dropPlaceholderData = null;
    if (index >= this.playlistVideos.length) {
      this.playlistVideos.push(video);
    } else {
      this.playlistVideos.splice(index, 0, video);
    }
  }

  createPlaylist() {
    const playlistName = prompt("What would you like to name your playlist?");
    if (!playlistName) {
      return;
    }

    let playlistId;
    let lastPromise = gapi.client.youtube.playlists
      .insert({
        part: "snippet,status",
        resource: {
          snippet: {
            title: playlistName,
            description:
              "A private playlist created with the YouTube API and CanJS"
          },
          status: {
            privacyStatus: "private"
          }
        }
      })
      .then(response => {
        playlistId = response.result.id;
      });

    const playlistVideos = this.playlistVideos.slice();
    playlistVideos.forEach(video => {
      lastPromise = lastPromise.then(() => {
        return gapi.client.youtube.playlistItems
          .insert({
            part: "snippet",
            resource: {
              snippet: {
                playlistId: playlistId,
                resourceId: video.id
              }
            }
          });
      });
    });

    this.createPlaylistPromise = lastPromise;
  }
}

customElements.define("playlist-editor", PlaylistEditor);
