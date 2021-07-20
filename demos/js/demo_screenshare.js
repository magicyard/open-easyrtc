var activeBox = -1; // nothing selected
var aspectRatio = 4 / 3; // standard definition video aspect ratio
var maxCALLERS = 3;
var numVideoOBJS = maxCALLERS + 1;
var layout;

easyrtc.dontAddCloseButtons(true);

function getIdOfBox(boxNum) {
  return "box" + boxNum;
}

function reshapeFull(parentw, parenth) {
  return {
    left: 0,
    top: 0,
    width: parentw,
    height: parenth,
  };
}

function reshapeTextEntryBox(parentw, parenth) {
  return {
    left: parentw / 4,
    top: parenth / 4,
    width: parentw / 2,
    height: parenth / 4,
  };
}

function reshapeTextEntryField(parentw, parenth) {
  return {
    width: parentw - 40,
  };
}

var margin = 20;

function reshapeToFullSize(parentw, parenth) {
  var left, top, width, height;
  var margin = 20;

  if (parentw < parenth * aspectRatio) {
    width = parentw - margin;
    height = width / aspectRatio;
  } else {
    height = parenth - margin;
    width = height * aspectRatio;
  }
  left = (parentw - width) / 2;
  top = (parenth - height) / 2;
  return {
    left: left,
    top: top,
    width: width,
    height: height,
  };
}

//
// a negative percentLeft is interpreted as setting the right edge of the object
// that distance from the right edge of the parent.
// Similar for percentTop.
//
function setThumbSizeAspect(
  percentSize,
  percentLeft,
  percentTop,
  parentw,
  parenth,
  aspect
) {
  var width, height;
  if (parentw < parenth * aspectRatio) {
    width = parentw * percentSize;
    height = width / aspect;
  } else {
    height = parenth * percentSize;
    width = height * aspect;
  }
  var left;
  if (percentLeft < 0) {
    left = parentw - width;
  } else {
    left = 0;
  }
  left += Math.floor(percentLeft * parentw);
  var top = 0;
  if (percentTop < 0) {
    top = parenth - height;
  } else {
    top = 0;
  }
  top += Math.floor(percentTop * parenth);
  return {
    left: left,
    top: top,
    width: width,
    height: height,
  };
}

function setThumbSize(percentSize, percentLeft, percentTop, parentw, parenth) {
  return setThumbSizeAspect(
    percentSize,
    percentLeft,
    percentTop,
    parentw,
    parenth,
    aspectRatio
  );
}

function setThumbSizeButton(
  percentSize,
  percentLeft,
  percentTop,
  parentw,
  parenth,
  imagew,
  imageh
) {
  return setThumbSizeAspect(
    percentSize,
    percentLeft,
    percentTop,
    parentw,
    parenth,
    imagew / imageh
  );
}

var sharedVideoWidth = 1;
var sharedVideoHeight = 1;

function reshape1of2(parentw, parenth) {
  if (layout == "p") {
    return {
      left: (parentw - sharedVideoWidth) / 2,
      top: (parenth - sharedVideoHeight * 2) / 3,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  } else {
    return {
      left: (parentw - sharedVideoWidth * 2) / 3,
      top: (parenth - sharedVideoHeight) / 2,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  }
}

function reshape2of2(parentw, parenth) {
  if (layout == "p") {
    return {
      left: (parentw - sharedVideoWidth) / 2,
      top: ((parenth - sharedVideoHeight * 2) / 3) * 2 + sharedVideoHeight,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  } else {
    return {
      left: ((parentw - sharedVideoWidth * 2) / 3) * 2 + sharedVideoWidth,
      top: (parenth - sharedVideoHeight) / 2,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  }
}

function reshape1of3(parentw, parenth) {
  if (layout == "p") {
    return {
      left: (parentw - sharedVideoWidth) / 2,
      top: (parenth - sharedVideoHeight * 3) / 4,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  } else {
    return {
      left: (parentw - sharedVideoWidth * 2) / 3,
      top: (parenth - sharedVideoHeight * 2) / 3,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  }
}

function reshape2of3(parentw, parenth) {
  if (layout == "p") {
    return {
      left: (parentw - sharedVideoWidth) / 2,
      top: ((parenth - sharedVideoHeight * 3) / 4) * 2 + sharedVideoHeight,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  } else {
    return {
      left: ((parentw - sharedVideoWidth * 2) / 3) * 2 + sharedVideoWidth,
      top: (parenth - sharedVideoHeight * 2) / 3,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  }
}

function reshape3of3(parentw, parenth) {
  if (layout == "p") {
    return {
      left: (parentw - sharedVideoWidth) / 2,
      top: ((parenth - sharedVideoHeight * 3) / 4) * 3 + sharedVideoHeight * 2,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  } else {
    return {
      left: ((parentw - sharedVideoWidth * 2) / 3) * 1.5 + sharedVideoWidth / 2,
      top: ((parenth - sharedVideoHeight * 2) / 3) * 2 + sharedVideoHeight,
      width: sharedVideoWidth,
      height: sharedVideoHeight,
    };
  }
}

function reshape1of4(parentw, parenth) {
  return {
    left: (parentw - sharedVideoWidth * 2) / 3,
    top: (parenth - sharedVideoHeight * 2) / 3,
    width: sharedVideoWidth,
    height: sharedVideoHeight,
  };
}

function reshape2of4(parentw, parenth) {
  return {
    left: ((parentw - sharedVideoWidth * 2) / 3) * 2 + sharedVideoWidth,
    top: (parenth - sharedVideoHeight * 2) / 3,
    width: sharedVideoWidth,
    height: sharedVideoHeight,
  };
}
function reshape3of4(parentw, parenth) {
  return {
    left: (parentw - sharedVideoWidth * 2) / 3,
    top: ((parenth - sharedVideoHeight * 2) / 3) * 2 + sharedVideoHeight,
    width: sharedVideoWidth,
    height: sharedVideoHeight,
  };
}

function reshape4of4(parentw, parenth) {
  return {
    left: ((parentw - sharedVideoWidth * 2) / 3) * 2 + sharedVideoWidth,
    top: ((parenth - sharedVideoHeight * 2) / 3) * 2 + sharedVideoHeight,
    width: sharedVideoWidth,
    height: sharedVideoHeight,
  };
}

var boxUsed = [true, false, false, false];
var connectCount = 0;

function setSharedVideoSize(parentw, parenth) {
  layout = parentw / aspectRatio < parenth ? "p" : "l";
  var w, h;

  function sizeBy(fullsize, numVideos) {
    return (fullsize - margin * (numVideos + 1)) / numVideos;
  }

  switch (layout + (connectCount + 1)) {
    case "p1":
    case "l1":
      w = sizeBy(parentw, 1);
      h = sizeBy(parenth, 1);
      break;
    case "l2":
      w = sizeBy(parentw, 2);
      h = sizeBy(parenth, 1);
      break;
    case "p2":
      w = sizeBy(parentw, 1);
      h = sizeBy(parenth, 2);
      break;
    case "p4":
    case "l4":
    case "l3":
      w = sizeBy(parentw, 2);
      h = sizeBy(parenth, 2);
      break;
    case "p3":
      w = sizeBy(parentw, 1);
      h = sizeBy(parenth, 3);
      break;
  }
  sharedVideoWidth = Math.min(w, h * aspectRatio);
  sharedVideoHeight = Math.min(h, w / aspectRatio);
}

var reshapeThumbs = [
  function (parentw, parenth) {
    if (activeBox > 0) {
      return setThumbSize(0.2, 0.01, 0.01, parentw, parenth);
    } else {
      setSharedVideoSize(parentw, parenth);
      switch (connectCount) {
        case 0:
          return reshapeToFullSize(parentw, parenth);
        case 1:
          return reshape1of2(parentw, parenth);
        case 2:
          return reshape1of3(parentw, parenth);
        case 3:
          return reshape1of4(parentw, parenth);
      }
    }
  },
  function (parentw, parenth) {
    if (activeBox >= 0 || !boxUsed[1]) {
      return setThumbSize(0.2, 0.01, -0.01, parentw, parenth);
    } else {
      switch (connectCount) {
        case 1:
          return reshape2of2(parentw, parenth);
        case 2:
          return reshape2of3(parentw, parenth);
        case 3:
          return reshape2of4(parentw, parenth);
      }
    }
  },
  function (parentw, parenth) {
    if (activeBox >= 0 || !boxUsed[2]) {
      return setThumbSize(0.2, -0.01, 0.01, parentw, parenth);
    } else {
      switch (connectCount) {
        case 1:
          return reshape2of2(parentw, parenth);
        case 2:
          if (!boxUsed[1]) {
            return reshape2of3(parentw, parenth);
          } else {
            return reshape3of3(parentw, parenth);
          }
        /* falls through */
        case 3:
          return reshape3of4(parentw, parenth);
      }
    }
  },
  function (parentw, parenth) {
    if (activeBox >= 0 || !boxUsed[3]) {
      return setThumbSize(0.2, -0.01, -0.01, parentw, parenth);
    } else {
      switch (connectCount) {
        case 1:
          return reshape2of2(parentw, parenth);
        case 2:
          return reshape3of3(parentw, parenth);
        case 3:
          return reshape4of4(parentw, parenth);
      }
    }
  },
];

function killButtonReshaper(parentw, parenth) {
  var imagew = 128;
  var imageh = 128;
  if (parentw < parenth) {
    return setThumbSizeButton(
      0.1,
      -0.51,
      -0.01,
      parentw,
      parenth,
      imagew,
      imageh
    );
  } else {
    return setThumbSizeButton(
      0.1,
      -0.01,
      -0.51,
      parentw,
      parenth,
      imagew,
      imageh
    );
  }
}

function muteButtonReshaper(parentw, parenth) {
  var imagew = 32;
  var imageh = 32;
  if (parentw < parenth) {
    return setThumbSizeButton(
      0.1,
      -0.51,
      0.01,
      parentw,
      parenth,
      imagew,
      imageh
    );
  } else {
    return setThumbSizeButton(
      0.1,
      0.01,
      -0.51,
      parentw,
      parenth,
      imagew,
      imageh
    );
  }
}

function reshapeTextEntryButton(parentw, parenth) {
  var imagew = 32;
  var imageh = 32;
  if (parentw < parenth) {
    return setThumbSizeButton(
      0.1,
      0.51,
      0.01,
      parentw,
      parenth,
      imagew,
      imageh
    );
  } else {
    return setThumbSizeButton(
      0.1,
      0.01,
      0.51,
      parentw,
      parenth,
      imagew,
      imageh
    );
  }
}

function handleWindowResize() {
  var fullpage = document.getElementById("fullpage");
  fullpage.style.width = window.innerWidth + "px";
  fullpage.style.height = window.innerHeight + "px";
  connectCount = easyrtc.getConnectionCount();

  function applyReshape(obj, parentw, parenth) {
    var myReshape = obj.reshapeMe(parentw, parenth);

    if (typeof myReshape.left !== "undefined") {
      obj.style.left = Math.round(myReshape.left) + "px";
    }
    if (typeof myReshape.top !== "undefined") {
      obj.style.top = Math.round(myReshape.top) + "px";
    }
    if (typeof myReshape.width !== "undefined") {
      obj.style.width = Math.round(myReshape.width) + "px";
    }
    if (typeof myReshape.height !== "undefined") {
      obj.style.height = Math.round(myReshape.height) + "px";
    }

    var n = obj.childNodes.length;
    for (var i = 0; i < n; i++) {
      var childNode = obj.childNodes[i];
      if (childNode.reshapeMe) {
        applyReshape(childNode, myReshape.width, myReshape.height);
      }
    }
  }

  applyReshape(fullpage, window.innerWidth, window.innerHeight);
}

function setReshaper(elementId, reshapeFn) {
  var element = document.getElementById(elementId);
  if (!element) {
    alert("Attempt to apply to reshapeFn to non-existent element " + elementId);
  }
  if (!reshapeFn) {
    alert("Attempt to apply misnamed reshapeFn to element " + elementId);
  }
  element.reshapeMe = reshapeFn;
}

function collapseToThumbHelper() {
  if (activeBox >= 0) {
    var id = getIdOfBox(activeBox);
    document.getElementById(id).style.zIndex = 2;
    setReshaper(id, reshapeThumbs[activeBox]);
    document.getElementById("muteButton").style.display = "none";
    document.getElementById("killButton").style.display = "none";
    activeBox = -1;
  }
}

function collapseToThumb() {
  collapseToThumbHelper();
  activeBox = -1;
  updateMuteImage(false);
  handleWindowResize();
}

function updateMuteImage(toggle) {
  var muteButton = document.getElementById("muteButton");
  if (activeBox > 0) {
    // no kill button for self video
    muteButton.style.display = "block";
    var videoObject = document.getElementById(getIdOfBox(activeBox));
    var isMuted = videoObject.muted ? true : false;
    if (toggle) {
      isMuted = !isMuted;
      videoObject.muted = isMuted;
    }
    muteButton.src = isMuted
      ? "images/button_unmute.png"
      : "images/button_mute.png";
  } else {
    muteButton.style.display = "none";
  }
}

function expandThumb(whichBox) {
  var lastActiveBox = activeBox;
  if (activeBox >= 0) {
    collapseToThumbHelper();
  }
  if (lastActiveBox != whichBox) {
    var id = getIdOfBox(whichBox);
    activeBox = whichBox;
    setReshaper(id, reshapeToFullSize);
    document.getElementById(id).style.zIndex = 1;
    if (whichBox > 0) {
      document.getElementById("muteButton").style.display = "block";
      updateMuteImage();
      document.getElementById("killButton").style.display = "block";
    }
  }
  updateMuteImage(false);
  handleWindowResize();
}

function prepVideoBox(whichBox) {
  var id = getIdOfBox(whichBox);
  setReshaper(id, reshapeThumbs[whichBox]);
  document.getElementById(id).onclick = function () {
    expandThumb(whichBox);
  };
}

function killActiveBox() {
  if (activeBox > 0) {
    var easyrtcid = easyrtc.getIthCaller(activeBox - 1);
    collapseToThumb();
    setTimeout(function () {
      easyrtc.hangup(easyrtcid);
    }, 400);
  }
}

function muteActiveBox() {
  updateMuteImage(true);
}

function callEverybodyElse(roomName, otherPeople) {
  easyrtc.setRoomOccupantListener(null); // so we're only called once.

  var list = [];
  var connectCount = 0;
  for (var easyrtcid in otherPeople) {
    list.push(easyrtcid);
  }
  //
  // Connect in reverse order. Latter arriving people are more likely to have
  // empty slots.
  //
  function establishConnection(position) {
    function callSuccess() {
      connectCount++;
      if (connectCount < maxCALLERS && position > 0) {
        establishConnection(position - 1);
      }
    }
    function callFailure(errorCode, errorText) {
      easyrtc.showError(errorCode, errorText);
      if (connectCount < maxCALLERS && position > 0) {
        establishConnection(position - 1);
      }
    }
    easyrtc.call(list[position], callSuccess, callFailure);
  }
  if (list.length > 0) {
    establishConnection(list.length - 1);
  }
}

function loginSuccess() {
  console.log("loginSuccess()!");
}

function easyAppBody(monitorVideoId, videoIds) {
  var videoIdsP = videoIds || [],
    numPEOPLE = videoIds.length,
    videoIdToCallerMap = {},
    onCall = null,
    onHangup = null;

  /**
   * Validates that the video ids correspond to dom objects.
   * @param {String} monitorVideoId
   * @param {Array} videoIds
   * @returns {Boolean}
   * @private
   */
  function validateVideoIds(monitorVideoId, videoIds) {
    var i;
    // verify that video ids were not typos.
    if (monitorVideoId && !document.getElementById(monitorVideoId)) {
      easyrtc.showError(
        easyrtc.errCodes.DEVELOPER_ERR,
        "The monitor video id passed to easyApp was bad, saw " + monitorVideoId
      );
      return false;
    }

    for (i in videoIds) {
      if (!videoIds.hasOwnProperty(i)) {
        continue;
      }
      var name = videoIds[i];
      if (!document.getElementById(name)) {
        easyrtc.showError(
          easyrtc.errCodes.DEVELOPER_ERR,
          "The caller video id '" + name + "' passed to easyApp was bad."
        );
        return false;
      }
    }
    return true;
  }

  function getCallerOfVideo(videoObject) {
    return videoIdToCallerMap[videoObject.id];
  }

  function setCallerOfVideo(videoObject, callerEasyrtcId) {
    videoIdToCallerMap[videoObject.id] = callerEasyrtcId;
  }

  function videoIsFree(obj) {
    var caller = getCallerOfVideo(obj);
    return caller === "" || caller === null || caller === undefined;
  }

  function getIthVideo(i) {
    if (videoIdsP[i]) {
      return document.getElementById(videoIdsP[i]);
    } else {
      return null;
    }
  }

  function showVideo(video, stream) {
    easyrtc.setVideoObjectSrc(video, stream);
    if (video.style.visibility) {
      video.style.visibility = "visible";
    }
  }

  function hideVideo(video) {
    easyrtc.setVideoObjectSrc(video, "");
    video.style.visibility = "hidden";
  }

  if (!validateVideoIds(monitorVideoId, videoIdsP)) {
    throw "bad video element id";
  }

  if (monitorVideoId) {
    document.getElementById(monitorVideoId).muted = "muted";
  }

  // easyrtc.addEventListener("roomOccupants", function (eventName, eventData) {
  //   var i;
  //   for (i = 0; i < numPEOPLE; i++) {
  //     var video = getIthVideo(i);
  //     if (!videoIsFree(video)) {
  //       if (!easyrtc.isPeerInAnyRoom(getCallerOfVideo(video))) {
  //         if (onHangup) {
  //           onHangup(getCallerOfVideo(video), i);
  //         }
  //         setCallerOfVideo(video, null);
  //       }
  //     }
  //   }
  // });

  /** Sets an event handler that gets called when an incoming MediaStream is assigned
   * to a video object. The name is poorly chosen and reflects a simpler era when you could
   * only have one media stream per peer connection.
   * @function
   * @memberOf Easyrtc_App
   * @param {Function} cb has the signature function(easyrtcid, slot){}
   * @example
   *   easyrtc.setOnCall( function(easyrtcid, slot){
   *      console.log("call with " + easyrtcid + "established");
   *   });
   */
  easyrtc.setOnCall = function (cb) {
    onCall = cb;
  };

  /** Sets an event handler that gets called when a call is ended.
   * it's only purpose (so far) is to support transitions on video elements.
   x     * this function is only defined after easyrtc.easyApp is called.
   * The slot is parameter is the index into the array of video ids.
   * Note: if you call easyrtc.getConnectionCount() from inside your callback
   * it's count will reflect the number of connections before the hangup started.
   * @function
   * @memberOf Easyrtc_App
   * @param {Function} cb has the signature function(easyrtcid, slot){}
   * @example
   *   easyrtc.setOnHangup( function(easyrtcid, slot){
   *      console.log("call with " + easyrtcid + "ended");
   *   });
   */
  easyrtc.setOnHangup = function (cb) {
    onHangup = cb;
  };

  /**
   * Get the easyrtcid of the ith caller, starting at 0.
   * @function
   * @memberOf Easyrtc_App
   * @param {number} i
   * @returns {String}
   */
  easyrtc.getIthCaller = function (i) {
    if (i < 0 || i >= videoIdsP.length) {
      return null;
    }
    var vid = getIthVideo(i);
    return getCallerOfVideo(vid);
  };

  /**
   * This is the complement of getIthCaller. Given an easyrtcid,
   * it determines which slot the easyrtc is in.
   * @function
   * @memberOf Easyrtc_App
   * @param {string} easyrtcid
   * @returns {number} or -1 if the easyrtcid is not a caller.
   */
  easyrtc.getSlotOfCaller = function (easyrtcid) {
    var i;
    for (i = 0; i < numPEOPLE; i++) {
      if (easyrtc.getIthCaller(i) === easyrtcid) {
        return i;
      }
    }
    return -1; // caller not connected
  };

  easyrtc.setOnStreamClosed(function (caller) {
    var i;
    for (i = 0; i < numPEOPLE; i++) {
      var video = getIthVideo(i);
      if (getCallerOfVideo(video) === caller) {
        hideVideo(video);
        setCallerOfVideo(video, "");
        if (onHangup) {
          onHangup(caller, i);
        }
      }
    }
  });

  var addControls, parentDiv, closeButton, i;
  if (autoAddCloseButtons) {
    addControls = function (video) {
      parentDiv = video.parentNode;
      setCallerOfVideo(video, "");
      closeButton = document.createElement("div");
      closeButton.className = "easyrtc_closeButton";
      closeButton.onclick = function () {
        if (getCallerOfVideo(video)) {
          easyrtc.hangup(getCallerOfVideo(video));
          hideVideo(video);
          setCallerOfVideo(video, "");
        }
      };
      parentDiv.appendChild(closeButton);
    };

    for (i = 0; i < numPEOPLE; i++) {
      addControls(getIthVideo(i));
    }
  }

  var monitorVideo = null;
  if (easyrtc.videoEnabled && monitorVideoId !== null) {
    monitorVideo = document.getElementById(monitorVideoId);
    if (!monitorVideo) {
      console.error("Programmer error: no object called " + monitorVideoId);
      return;
    }
    monitorVideo.muted = "muted";
    monitorVideo.defaultMuted = true;
  }
}

function easyApp(
  applicationName,
  monitorVideoId,
  videoIds,
  onReady,
  onFailure
) {
  var gotMediaCallback = null,
    gotConnectionCallback = null;

  easyAppBody(monitorVideoId, videoIds);

  easyrtc.setGotMedia = function (gotMediaCB) {
    gotMediaCallback = gotMediaCB;
  };

  //
  // try to restablish broken connections that weren't caused by a hangup
  //
  easyrtc.setPeerClosedListener(function (easyrtcid) {
    setTimeout(function () {
      if (
        easyrtc.getSlotOfCaller(easyrtcid) >= 0 &&
        easyrtc.isPeerInAnyRoom(easyrtcid)
      ) {
        easyrtc.call(
          easyrtcid,
          function () {},
          function () {},
          function () {}
        );
      }
    }, 1000);
  });

  /** Sets an event handler that gets called when a connection to the signaling
   * server has or has not been made. Can only be called after calling easyrtc.easyApp.
   * @function
   * @memberOf Easyrtc_App
   * @param {Function} gotConnectionCB has the signature (gotConnection, errorText)
   * @example
   *    easyrtc.setGotConnection( function(gotConnection, errorText){
   *        if( gotConnection ){
   *            console.log("Successfully connected to signaling server");
   *        }
   *        else{
   *            console.log("Failed to connect to signaling server because: " + errorText);
   *        }
   *    });
   */
  easyrtc.setGotConnection = function (gotConnectionCB) {
    gotConnectionCallback = gotConnectionCB;
  };

  function nextInitializationStep(/* token */) {
    if (gotConnectionCallback) {
      gotConnectionCallback(true, "");
    }
    onReady(easyrtc.myEasyrtcid);
  }

  function postGetUserMedia() {
    if (gotMediaCallback) {
      gotMediaCallback(true, null);
    }
    if (monitorVideoId !== null) {
      easyrtc.setVideoObjectSrc(
        document.getElementById(monitorVideoId),
        easyrtc.getLocalStream()
      );
    }
    function connectError(errorCode, errorText) {
      if (gotConnectionCallback) {
        gotConnectionCallback(false, errorText);
      } else if (onFailure) {
        onFailure(easyrtc.errCodes.CONNECT_ERR, errorText);
      } else {
        easyrtc.showError(easyrtc.errCodes.CONNECT_ERR, errorText);
      }
    }

    easyrtc.connect(applicationName, nextInitializationStep, connectError);
  }

  var displayMediaConstraints = {
    aspectRatio: 1.7777777777777777,
    frameRate: 25,
    height: 1080,
    resizeMode: "crop-and-scale",
    width: 1920,
    cursor: "motion",
    displaySurface: "browser",
    logicalSurface: true,
  };

  var stream = easyrtc.getLocalStream(null);
  if (stream) {
    postGetUserMedia();
  } else {
    easyrtc.initMediaSource(
      postGetUserMedia,
      function (errorCode, errorText) {
        if (gotMediaCallback) {
          gotMediaCallback(false, errorText);
        } else if (onFailure) {
          onFailure(easyrtc.errCodes.MEDIA_ERR, errorText);
        } else {
          easyrtc.showError(easyrtc.errCodes.MEDIA_ERR, errorText);
        }
      },
      null, // default stream,
      navigator.mediaDevices.getDisplayMedia,
      displayMediaConstraints
    );
  }
}

function appInit() {
  // // Prep for the top-down layout manager
  // setReshaper('fullpage', reshapeFull);
  // for(var i = 0; i < numVideoOBJS; i++) {
  //     prepVideoBox(i);
  // }
  // setReshaper('killButton', killButtonReshaper);
  // setReshaper('muteButton', muteButtonReshaper);
  // setReshaper('textentryBox', reshapeTextEntryBox);
  // setReshaper('textentryField', reshapeTextEntryField);
  // setReshaper('textEntryButton', reshapeTextEntryButton);

  // updateMuteImage(false);
  // window.onresize = handleWindowResize;
  // handleWindowResize(); //initial call of the top-down layout manager

  easyrtc.setRoomOccupantListener(callEverybodyElse);
  easyrtc.easyApp(
    "easyrtc.multiparty",
    "box0",
    [], //["box1", "box2", "box3"],
    loginSuccess
  );
  easyrtc.setPeerListener((message) => {
    connsole.log("Received message: " + message);
  });
  easyrtc.setDisconnectListener(function () {
    easyrtc.showError("LOST-CONNECTION", "Lost connection to signaling server");
  });
  easyrtc.setOnCall(function (easyrtcid, slot) {
    console.log("getConnection count=" + easyrtc.getConnectionCount());
    boxUsed[slot + 1] = true;
    if (activeBox == 0) {
      // first connection
      collapseToThumb();
      document.getElementById("textEntryButton").style.display = "block";
    }
    document.getElementById(getIdOfBox(slot + 1)).style.visibility = "visible";
    handleWindowResize();
  });

  easyrtc.setOnHangup(function (easyrtcid, slot) {
    boxUsed[slot + 1] = false;
    if (activeBox > 0 && slot + 1 == activeBox) {
      collapseToThumb();
    }
    setTimeout(function () {
      document.getElementById(getIdOfBox(slot + 1)).style.visibility = "hidden";

      if (easyrtc.getConnectionCount() == 0) {
        // no more connections
        expandThumb(0);
        document.getElementById("textEntryButton").style.display = "none";
        document.getElementById("textentryBox").style.display = "none";
      }
      handleWindowResize();
    }, 20);
  });
}
