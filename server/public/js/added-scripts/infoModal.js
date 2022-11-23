const infoModal =  (msg) => {
    return `<div id="info-modal" style="position: fixed; top: 30%; left: 30%; width: 40vw; height: 40vh; z-index: 2000; background: aliceblue;" onclick="(()=>{this.remove()})(this)">
                <i style="font-size: xx-large; float: right; margin: 2% 2%; cursor: pointer" class="fa fa-window-close" aria-hidden="true"></i>
                <div style="margin: 10% 0; text-align: center; color: black">
                    <h2>${msg}</h2>
                </div>
            <div>`
}