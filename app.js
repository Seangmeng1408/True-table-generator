let row=document.querySelector(".row");
let column=document.querySelector(".column");
let header=document.querySelector("#header")
let table=document.querySelector("table")

window.onbeforeunload = function()
{
    var conf = confirm("Your data not save.\n Are you sure?");
    if(conf)
    {
        window.location.reload();
    }
    else
    {
        return "";
    }
};
window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
};
function ValueToggle(){
    [...document.querySelectorAll("td")].forEach((item, index)=>{
        item.addEventListener("click",()=>{
            
            item.innerText=item.innerText=="0"? "1":"0"
            
            
        })
        
    })
    
    
}
ValueToggle()  


function RowAdder(){
    ValueToggle()  
    row.addEventListener("click",()=>{
        ValueToggle()
        let tmpTr=document.createElement("tr");
        for(let i=0;i<header.childElementCount;i++){
            let tmpTd=document.createElement("td");
            tmpTd.innerText="0"
            tmpTr.append(tmpTd);
            
            
        }
        table.children[0].append(tmpTr);
        ValueToggle()
        
    })
    column.addEventListener("click",()=>{
        ValueToggle()
        let header=document.querySelector("#header")
        let table=document.querySelector("table")
        let lastName=header.children[header.childElementCount-2].innerText
        let tmpHeader=document.createElement("th");
        tmpHeader.innerText=String.fromCharCode(lastName.charCodeAt(0)+1);
        tmpHeader.setAttribute("contenteditable","");
        header.insertBefore(tmpHeader,header.children[header.childElementCount-1]);
        for(let i=0;i<table.children[0].childElementCount;i++){
            if(table.children[0].children[i].id!="header"){
                let lastChild=table.children[0].children[i].children[table.children[0].children[i].childElementCount-1]
                let tmpTd=document.createElement("td");
                tmpTd.innerText="0";
                table.children[0].children[i].insertBefore(tmpTd,lastChild);
                
                
            }
        }
        let count=Math.pow(2,header.childElementCount-1);
        header=document.querySelector("#header")
        table=document.querySelector("table")
        let completeRow=(count-table.children[0].childElementCount)
        for(let i=0;i<=completeRow;i++){
            let tmpTr=document.createElement("tr");
            for(let j=0;j<header.childElementCount;j++){
                let tmpTd=document.createElement("td");
                tmpTd.innerText="0"
                tmpTr.append(tmpTd);
                
                
            }
            table.children[0].append(tmpTr);
        }
        ValueToggle()
    })
    
}
RowAdder()

function Delete(){
    ValueToggle()  
    let del_r=document.querySelector(".Delete_row");
    let del_c=document.querySelector(".Delete_column");
    let del_pos_col=document.querySelector(".Delete_sp_col");
    let del_pos_row=document.querySelector(".Delete_sp_row");
    
    del_r.addEventListener("click",()=>{
        ValueToggle() 
        let row=document.querySelectorAll("tr");
        if(table.children[0].children.length>2){
            table.children[0].deleteRow(table.children[0].childElementCount-1)
        }else{
            alert("table at least has 1 row or cell")
        }
        ValueToggle()  
    })
    del_c.addEventListener("click",()=>{
        ValueToggle() 
        let row=document.querySelectorAll("tr");
        let i=0;
        row.forEach((item,index)=>{
            if(item.children.length>2){
                item.deleteCell(item.children.length-2);
            }else {
                if(i==0){
                    alert("table at least has 1 row or column");
                    i++
                }
            }
        })
        let header=document.querySelector("#header")
        let count=Math.pow(2,header.childElementCount-1);
        let table=document.querySelector("table");
        let completeRow=table.children[0].childElementCount-count;
        console.log(completeRow)
        for(let i=1;i<completeRow;i++){
            table.children[0].deleteRow(table.children[0].childElementCount-1)
        }
        ValueToggle()  
    })
    del_pos_col.addEventListener("click",()=>{
        ValueToggle() 
        let row=document.querySelectorAll("tr");
        let pos=document.querySelector("#pos_data_col");
        if(pos.valueAsNumber<=row[0].children.length && pos.valueAsNumber>0){
            let i=0;
            row.forEach((item,index)=>{
                if(item.children.length>2){
                    item.deleteCell(pos.valueAsNumber-1);
                    
                }else {
                    if(i==0){
                        alert("table at least has 1 row or column");
                        i++
                    }
                }
            })
        }else{
            alert("Position smaller than or bigger than column");
        }
        ValueToggle()  
    })
    
    del_pos_row.addEventListener("click",()=>{
        ValueToggle() 
        let row=document.querySelectorAll("tr");
        let pos=document.querySelector("#pos_data_row");
        if(pos.valueAsNumber>0 && pos.valueAsNumber<=table.children[0].children.length){
            if(table.children[0].children.length>2){
                table.children[0].deleteRow(pos.valueAsNumber)
            }else{
                alert("table at least has 1 row or cell")
            }
            
        }else{
            alert("Position smaller than or bigger than row");
        }
        ValueToggle()  
    })
}
Delete();
function FixScroll(){
    var Btn_con=document.querySelector("#Button_container")
    var table_con=document.querySelector("#table_container");
    window.addEventListener("scroll",(e)=>{
        if(window.scrollY>0){
            Btn_con.style.position="fixed"
            Btn_con.style.top="0px"
            table_con.style.marginTop=`${Btn_con.offsetHeight}px`;
        }else{
            Btn_con.style.position=""
            Btn_con.style.top=""
            table_con.style.marginTop="";
        }
    })
}
FixScroll()

function generate(){
    let header=[...document.querySelector("#header").children]
    let _text=`${header[header.length-1].innerText}=`;
    let table=document.querySelector("table").children[0]
    for(let j=1;j<table.childElementCount;j++){
        if(table.children[j].children[header.length-1].innerText=="1"){
            for(let i=0;i<header.length-1;i++){
                if(table.children[j].children[i].innerText=="1"){
                    _text+=header[i].innerText;
                }else{
                    _text+="!"+header[i].innerText;
                }
            }
                _text+="+";
            
        }
        
    }
    _text=_text[_text.length-1]=="+"?_text.slice(0, -1):_text;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    Swal.fire({
        title: 'Are you want to copy this?',
        text: `${_text}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Copy'
    }).then((result) => {
        if (result.isConfirmed) {
            navigator.clipboard.writeText(_text);
            Swal.fire(
                'Copies',
                'success'
                )
            }
        })
    }