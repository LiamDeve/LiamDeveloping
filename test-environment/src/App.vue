<template>
    <div class="center">
        <label for="shot_button" class="new_shot_button">開啟前相機拍攝</label>
        <input
            type="button"
            value=""
            id="shot_button"
            @click="openActionSheet"
            style="display: none"
        />
        <video
            id="videoElement"
            class="videoElement"
            autoplay
            muted
            playsinline
        ></video>
        <div id="imageContainer"></div>
        <button @click="switchCamera">切換鏡頭</button>
        <p>測試7</p>
    </div>
</template>

<script>
export default {
    name: "App",
    methods: {
        openActionSheet() {
            this.$q.dialog({
                title: "My Action Sheet",
                message: "Choose an option",
                buttons: [
                    {
                        label: "拍攝相片",
                        handler: () => {
                            this.startCam(); // 開啟前鏡頭拍攝
                        },
                    },
                    {
                        label: "從圖庫中選擇",
                        handler: () => {
                            this.chooseFromGallery(); // 這裡可以添加從圖庫中選擇的邏輯
                        },
                    },
                    {
                        label: "取消",
                        handler: () => {
                            console.log("Action Sheet Cancelled");
                        },
                    },
                ],
            });
        },
        startCam() {
            const videoElement = document.getElementById("videoElement");
            const constraints = { video: { facingMode: "user" } }; // 使用前鏡頭
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(function (stream) {
                        videoElement.srcObject = stream;
                    })
                    .catch(function (error) {
                        console.error("無法取得視訊串流:", error);
                        alert("無法取得視訊串流");
                    });
            } else {
                alert("您的瀏覽器不支援視訊串流");
            }
        },
        switchCamera() {
            const videoElement = document.getElementById("videoElement");
            if (videoElement.srcObject) {
                let videoTracks = videoElement.srcObject.getVideoTracks();
                if (videoTracks.length > 0) {
                    let currentTrack = videoTracks[0];
                    let facingMode = currentTrack.getSettings().facingMode;

                    const constraints = { video: {} };
                    if (facingMode === "user") {
                        constraints.video.facingMode = "environment"; // 切換到後鏡頭
                    } else {
                        constraints.video.facingMode = "user"; // 切換到前鏡頭
                    }

                    videoTracks.forEach(function (track) {
                        track.stop(); // 停止原本的視訊串流
                    });

                    navigator.mediaDevices
                        .getUserMedia(constraints)
                        .then(function (stream) {
                            videoElement.srcObject = stream;
                        })
                        .catch(function (error) {
                            console.error("無法取得視訊串流:", error);
                            alert("無法取得視訊串流");
                        });
                }
            }
        },
        chooseFromGallery() {
            // 從圖庫中選擇圖片的邏輯
            console.log("選擇圖庫圖片功能");
        },
    },
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.videoElement {
    width: 100%;
    height: auto;
}
.new_shot_button {
    color: rgb(97, 158, 179);
    border: 1px solid;
    border-radius: 12px;
    width: 150px;
    text-align: center;
    padding: 8px;
    cursor: pointer;
}
</style>
