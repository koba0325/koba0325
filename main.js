"use stirct"
{
    class Panel {
        constructor(){
            const section = document.createElement("section");
            section.classList.add("panel");

            this.img = document.createElement("img");
            this.img.src = this.getRandamImage();

            this.timeoutId = undefined;

            this.stop = document.createElement("div")
            this.stop.textContent = "STOP"
            this.stop.classList.add("stop", "inactive");
            this.stop.addEventListener("click", ()=>{
                if(this.stop.classList.contains("inactive")){
                    return;
                }
                this.stop.classList.add("inactive");
                clearTimeout(this.timeoutId);

                panelsLeft--;
                
                if(panelsLeft === 0){
                    start.classList.remove("inactive");
                    panelsLeft = 3;
                    checkResult();
                }
            });

            section.appendChild(this.img);
            section.appendChild(this.stop);

            const main = document.querySelector("main");
            main.appendChild(section);
        }
        
    
        getRandamImage(){
            const images = [
                "img/seven.jpeg",
                "img/bar.jpeg",
                "img/bell.jpeg",
                "img/Cherry.png",
                "img/grape.jpeg",
                "img/piero.jpeg",
                "img/replay.jpeg",
            ];
            return images[Math.floor(Math.random()*images.length)];
        }

        start(){
            this.img.src = this.getRandamImage();
            this.timeoutId = setTimeout(()=>{
               this.start();
            },50);
        }

        isUnmatched(p1,p2){
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
            
        }

        unmathch(){
            this.img.classList.add("unmathced");
        }

        activate(){
            this.img.classList.remove("unmathced");
            this.stop.classList.remove("inactive");
        }
    }

    function checkResult(){
        if(panels[0].isUnmatched(panels[1],panels[2])){
            panels[0].unmathch();
        }
        if(panels[1].isUnmatched(panels[0],panels[2])){
            panels[1].unmathch();
        }
        if(panels[2].isUnmatched(panels[0],panels[1])){
            panels[2].unmathch();
        }
    }
    
    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    let panelsLeft = 3;


    const start = document.getElementById("start");
    start.addEventListener("click", ()=>{
        if(start.classList.contains("inactive")){
            return;
        }
        start.classList.add("inactive");
        panels.forEach(panel =>{
            panel.activate();
            panel.start();
        });
    });
}