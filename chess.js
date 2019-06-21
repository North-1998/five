$(function () {

let box = $(".box");
let flag = true;
let black = {},white = {};
let blank = {};
let ai = true;
    for(let i =0; i<15;i++){
        for (let j=0;j<15;j++){
           $("<div>").addClass("chess").appendTo(box)
               .attr("id",i+'_'+j);
           blank[i+'_'+j] =true;
        }
    }
    box.on("click",".chess",function() {
        let _this = $(this)
        let coords = _this.attr("id");
        if ($(this).hasClass("white")||$(this).hasClass("black")){
            return;
        }
        flag = !flag;
        if (flag){
            black[coords] = true;
            $(this).addClass("black");
            delete blank[coords];
            console.log(isSuccess(black, coords));
            if ( isSuccess(black,coords)>=5){
                console.log("black success");
                box.off("click");
            }
        } else {
            white[coords] = true;
            $(this).addClass("white");
            delete blank[coords];
            console.log(isSuccess(white, coords));
            if ( isSuccess(white,coords)>=5){
                console.log("white success");
                box.off("click");
            }
            if(ai){
               let pos = aifn();
               black[pos] =true;
               delete blank[pos];
               $("#"+pos).addClass("black");
                console.log(isSuccess(black, pos));
               if ( isSuccess(black,pos)>=5){
                    console.log("black success");
                    box.off("click");
                }

                flag = !flag;
            }


        }

    })

    function aifn() {
       let blankScore1 =0;
       let blankScore2 =0;
       let pos1 = '';
       let pos2 = '';
       for(let i in blank){
           let score = isSuccess(black,i);
           if (score>blankScore1){
               blankScore1 = score;
               pos1 = i;
           }
       }
       for (let i in blank){
           let score = isSuccess(white,i);
           if (score > blankScore2){
               blankScore2 =score;
               pos2 = i;
           }
       }
       if (blankScore1>blankScore2){
           return pos1;
       }else {
           return pos2;
       }
    }


    function isSuccess(obj,coords) {
        let sp = 1, cz = 1, zx = 1, yx = 1;
        let [x , y] = coords.split("_");
        let i = x*1 , j = y*1;
        while(obj[ i+'_'+(++j) ]){
            sp++;
        }
        i = x*1;
        j = y*1;
        while (obj[ i+'_'+(--j)]){
            sp++;
        }

    //    cz
        i = x*1;
        j = y*1;
        while(obj[(--i)+'_'+j]){
            cz++;
        }
        i = x*1;
        j = y*1;
        while(obj[(++i)+'_'+j]){
            cz++;
        }
        //zx
        i = x*1;
        j = y*1;
        while(obj[(--i)+'_'+(++j)]){
            zx++
        }
        i = x*1;
        j = y*1;
        while(obj[(++i)+'_'+(--j)]){
            zx++
        }
        //yx
        i = x*1;
        j = y*1;
        while(obj[(--i)+'_'+(--j)]){
            yx++;
        }
        i = x*1;
        j = y*1;
        while(obj[(++i)+'_'+(++j)]){
            yx++;
        }
        return Math.max(sp,cz,zx,yx);



        
    }


        

})