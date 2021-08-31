const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];
  var selectedNum;
  var selectedTile;
  var disableSelect;
  let diffNum = 1;
  var difficulty = easy[0];
  var answer = [""];
  function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}
function changeDifficulty(n) {
    switch(n)
    {
        case 1 :  window.difficulty = easy[0];
        break;
        case 2 :  window.difficulty = medium[0];
        break;
        case 3 :  window.difficulty = hard[0];
        break;
        default: window.difficulty = easy[0];
    }
    startGame();
}
  window.onload=function(){
      document.getElementById("validate").addEventListener("click",startGame);
      document.getElementById('clear').addEventListener("click",clearrr);
      document.getElementById("answer").addEventListener("click",showAnswer);
  }

  function startGame(){
     
      board = difficulty;    
    fillAns(difficulty);    
    //Create board  
    createBoard(board);
    if(sessionStorage.getItem("cache")){
        var saved  = sessionStorage.getItem("cache");
        var diff = sessionStorage.getItem("diff");
        if(diff != diffNum){
        if(diff==1) {
            changeDifficulty(1);
        } else if(diff==2) {
            changeDifficulty(2);
        } else if(diff==3) {
            changeDifficulty(3);
        }
            } else {
            saved = saved.split(",");
            answer = saved;
            for(i=0;i<81;i++){
            if(saved[i]!="-" && saved[i]!=difficulty[i]){
            document.querySelectorAll(".tile")[i].classList.add("selected"); 
            document.getElementById(i).textContent = saved[i];
            }
        }
            }
        
    }
}
  function createBoard(board){//generateBoard(board){
      clearPrevious();
      let idCount=0;
      for(let i=0;i<81;i++){
          let tile=document.createElement("p");
          if(board.charAt(i)!="-"){
              tile.textContent=board.charAt(i);
              tile.classList.add("bgcolor");
          }else{
           
              tile.addEventListener("click",function(){
                  if(!disableSelect){
                      if(tile.classList.contains("selected")){
                          tile.classList.remove("selected");
                          selectedTile=null;
                      }else{
                          for(let i=0;i<81;i++){
                              document.querySelectorAll(".tile")[i].classList.remove("selected");
                          }
                          tile.classList.add("selected");
                          selectedTile=tile;
                          updateMove();
                      }
                  }
              });
          }
          tile.id=idCount;
              idCount++;
          tile.classList.add("tile");
          if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54 )) {
            tile.classList.add("bottomBorder");
        }
        
        if( ((tile.id + 1) % 9 == 3) || ((tile.id + 1) % 9 == 6) ) {
            tile.classList.add("rightBorder");
        }
        
        if((tile.id + 1) % 9 == 0 || (tile.id + 1) % 9 == 0) {
              tile.classList.add("rightBorder");
         }
        
        if((tile.id + 2) % 9 == 2 || (tile.id + 2) % 9 == 2) {
            tile.classList.add("leftBorder");
       }
        
        if((tile.id > 71 && tile.id < 81)) {
            tile.classList.add("bottomBorder");
        }
        
        if((tile.id > -1 && tile.id < 9)) {
            tile.classList.add("topBorder");
        }
          document.getElementById("board").appendChild(tile);
      }
  }
  function updateMove() {
    if(selectedTile)
    {
        document.addEventListener('keydown', (event) => {
            var name = event.key;
            if(name>0 && name<10)
            {
            selectedTile.textContent = name;
            addToArray(name);
            addToCache();          

            } else if (name==0)
            {
            selectedTile.textContent = null;
            removeFromArray();
            }
          }, false);       
    }
}
function fillAns(str) {
    for(let i=0;i<str.length;i++) {
        answer[i] = str[i];
    }  
}
function addToCache() {
    sessionStorage.setItem("cache",answer);
    sessionStorage.setItem("diff",diffNum);
}
function addToArray(num) {
    let index = document.querySelector(".selected").id;
    answer.splice(index,1,num);
    checks();
}
function removeFromArray() {
    let index = document.querySelector(".selected").id;
    answer.splice(index,1,"-");
}
  function clearPrevious(){
      let tiles=document.querySelectorAll(".tile");
      for(let i=0;i<tiles.length;i++)
      {
          tiles[i].remove();
      }
      for(let i=0;i<document.getElementById("game-containers").children.length;i++){
          document.getElementById("game-containers").children[i].classList.remove("selected");
      }
      selectedNum=null;
      selectedTile=null;
  }
  function showAnswer(){
    let board;
    let tiles=document.querySelectorAll(".tile");
    if(document.getElementById('level3').checked == true) board=hard[1]; 
    else if(document.getElementById('level2').checked == true) board=medium[1];
    else board=easy[1];
    disableSelect=false;
    generateFullBoard(board);
  }
  function generateFullBoard(board){
    clearPrevious();
      let idCount=0;
      for(let i=0;i<81;i++){
          let tile=document.createElement("p");
          if(board.charAt(i)!="-"){
              tile.textContent=board.charAt(i);
              tile.classList.add("bgcolor");
          }
          tile.id=idCount;
              idCount++;
          tile.classList.add("tile");
          if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54 )) {
            tile.classList.add("bottomBorder");
        }
        
        if( ((tile.id + 1) % 9 == 3) || ((tile.id + 1) % 9 == 6) ) {
            tile.classList.add("rightBorder");
        }
        
        if((tile.id + 1) % 9 == 0 || (tile.id + 1) % 9 == 0) {
              tile.classList.add("rightBorder");
         }
        
        if((tile.id + 2) % 9 == 2 || (tile.id + 2) % 9 == 2) {
            tile.classList.add("leftBorder");
       }
        
        if((tile.id > 71 && tile.id < 81)) {
            tile.classList.add("bottomBorder");
        }
        
        if((tile.id > -1 && tile.id < 9)) {
            tile.classList.add("topBorder");
        }
          document.getElementById("board").appendChild(tile);
      }
}
function validate() {
    let status= 1;
   for(let i=0;i<answer.length;i++)
   {
       let sum=0;
    
   for(let i=0;i<9;i++){
       if(answer!="-")
    sum+=parseInt(answer[i]);
       for(let j=i+9;j<81;j+=9){
        if(answer!="-")
           sum+=parseInt(answer[j]);
       }
   }
   if(sum!=405){
    status = 0;
   }  
   if(status!=0)
   {
        checks();
        for(let i=0;i<81;i++){
        if(document.getElementById(i).classList.contains("incorrect")){
            status=0;
            break;
        }
    }
   }   
    }
    if(status==1){
        endGame();
        return;
       } else {
        alert("Something is not right, Try again.");
       }   
}
function endGame() {
    sessionStorage.clear();

    for(let i=0;i<81;i++){
        document.getElementById(i).classList.add("prefilled");      
    }
    alert("You Win!!!!");
}
function checks() {
    let col = parseInt(selectedTile.id % 9);
    let row = parseInt(selectedTile.id / 9);
    let s = selectedTile.id;
    //VERTICAL CHECK
    for(let i=col;i<col+73;i+=9)
    {
        let ins = 1;
        for(let j=col;j<col+73;j+=9){
            if(i!=j && answer[i]==answer[j]){
                document.getElementById(s).classList.add("incorrect");
                document.getElementById(j).classList.add("incorrect");
                ins++;
            }
        }
        if(ins==1){
            for(let j=col;j<col+73;j+=9){
                if(answer[i]==answer[j]){
                    document.getElementById(i).classList.remove("incorrect");
                    document.getElementById(j).classList.remove("incorrect");
                }
            }
        }
    }
     //HORIZONTAL CHECK  
    for(let i=row*9;i<row*9+9;i++)
    {
        let ins = 1;
        for(let j=row*9;j<row*9+9;j++){
            if(i!=j && answer[i]==answer[j]){
                document.getElementById(i).classList.add("incorrect");
                document.getElementById(j).classList.add("incorrect");
                ins++;
            }
        }
        if(ins==1){
            for(let j=row*9;j<row*9+9;j++){
                if(answer[i]==answer[j]){
                    document.getElementById(i).classList.remove("incorrect");
                    document.getElementById(j).classList.remove("incorrect");
                }
            }
        }
    }
    //box1
    let x = 0;
    let y = 3;
    if( (-1<s && s<3) || (8<s && s<12) || (17<s && s<21) ) {    
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }
        }
    //box2
    x = 3;
    y = 6;
    if( (2<s && s<6) || (11<s && s<15) || (20<s && s<24) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }
    }
    //box3
    x = 6;
    y = 9;
    if( (5<s && s<9) || (14<s && s<18) || (23<s && s<27) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }       
    }
    //box4
    x=27;
    y=30;
    if( (26<s && s<30) || (35<s && s<39) || (44<s && s<48) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box5
    x = 30;
    y = 33;
    if( (29<s && s<33) || (38<s && s<42) || (47<s && s<51) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box6
    x = 33;
    y = 36;
    if( (32<s && s<36) || (41<s && s<45) || (50<s && s<54) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box7
    x = 54;
    y = 57;
    if( (53<s && s<57) || (62<s && s<66) || (71<s && s<75) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box8
    x = 57;
    y = 60;
    if( (56<s && s<60) || (65<s && s<69) || (74<s && s<78) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }    
    }
    //box9
    x = 60;
    y = 63;
    if( (59<s && s<63) || (68<s && s<72) || (77<s && s<81) ) {
        for(let i=x;i<y;i++){
            for(let j=i;j<i+19;j+=9){
                let ins = 1;
                for(let k=x;k<y;k++){
                    for(let l=k;l<k+19;l+=9) {
                            if(l!=j && answer[l] == answer[j]){
                                document.getElementById(j).classList.add("incorrect");
                                document.getElementById(l).classList.add("incorrect");
                                ins++;
                            }
                        }
                    }               
                if(ins==1) {
                    for(let k=x;k<y;k++){
                        for(let l=k;l<k+19;l+=9) {
                                if(answer[l] == answer[j]){
                                    document.getElementById(j).classList.remove("incorrect");
                                    document.getElementById(l).classList.remove("incorrect");
                                }
                            }
                        }
                    }
                }
            }   
    }
}
function clearrr(){
    sessionStorage.clear();
    startGame();
}
