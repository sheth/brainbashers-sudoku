////////////////////////////////////////////////////////
// JavaScript Copyright Kevin Stone 1997-2013
////////////////////////////////////////////////////////

var checkIt;

function IsNumeric(sText)
{
    var ValidChars = "0123456789.";
    var IsNumber=true;
    var Char;

    for (i = 0; i < sText.length && IsNumber == true; i++)
    {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1)
        {
            IsNumber = false;
        }
    }
    return IsNumber;
}

function trim(s)
{
    while (s.substring(0,1) == ' ')
    {
        s = s.substring(1,s.length);
    }
    while (s.substring(s.length-1,s.length) == ' ')
    {
        s = s.substring(0,s.length-1);
    }
    return s;
}

function getObject(loobject)
{
    if (document.getElementById)
    {
        loobject = document.getElementById(loobject);
    }
    else if (document.all)
    {
        loobject = document.all.item(loobject);
    }
    else
    {
        loobject = null;
    }

    return loobject;
}

// moves BBobjdiv on index.asp
function moveit()
{
    var height = (document.all) ? document.body.clientHeight : window.innerHeight;
    var width  = (document.all) ? document.body.clientWidth : window.innerWidth;
    var myScroll = (document.all) ? document.body.scrollTop : window.pageYOffset;
    var objCSS = getObject('bbobjdiv');
    if (objCSS==null) return;

    oldtop = parseFloat(objCSS.style.top);
    if (oldtop)
    {
    }
    else
    {
        oldtop = 0;
    }

    newtop = (height + myScroll) - 80;

    objCSS.style.top = Math.round(newtop - (newtop - oldtop) * 0.8);
    objCSS.style.left = width - 80;
    objCSS.style.display = 'block';
    objCSS.style.visibility = 'visible';

    setTimeout("moveit()",40);

    return;
}

// clears an input field (see games.asp)
function clearit()
{
    loobject=getObject('addurl');
    if (loobject==null) return;
    loobject.value = '';
}

// doesn't seem to be used
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}


// use this one - from Show Sudoku
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+(expiredays*24*3600*1000));
    document.cookie=c_name+ '=' +escape(value)+ ((expiredays==null) ? '' : '; expires='+exdate);
}

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + '=');
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(';',c_start);
            if (c_end==-1)
            {
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return '';
}


function lck()
{
    var lnwidth  = ((document.all) ? document.body.clientWidth : window.innerWidth) - 40;
    var lnheight = ((document.all) ? document.body.clientHeight : window.innerHeight) - 200;

    createCookie("width",lnwidth,10);
    createCookie("height",lnheight,10);

    return true;
}

function toRGBHex(num)
{
    var decToHex="";
    var arr = new Array();
    var numStr = new String();
    numStr = num;

    arr = numStr.split(",");

    for(var i=0;i<3;i++)
    {
        var hexArray = new Array( "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" );
        var code1 = Math.floor(arr[i] / 16);var code2 = arr[i] - code1 * 16;
        decToHex += hexArray[code1];
        decToHex += hexArray[code2];
    }
    return (decToHex);
}

// find the image's name
function imagename(lcimage)
{
    var lcwhere;

    lcwhere = lcimage.lastIndexOf('/') + 1;
    lcimage = lcimage.substring(lcwhere , lcimage.length);
    lnwhere = lcimage.lastIndexOf('.') + 1;
    lcimage = lcimage.substr(0 , lnwhere - 1);
    lcimage = lcimage.toLowerCase();

    return lcimage;
}

// post a time for a japan-type puzzle
// NOTE: lntime is seconds
function postjapantime(lcname , lcdate , lcsize, lcdiff , lcanswershown , lntime)
{
    if (window.XMLHttpRequest)
    {
        lcrequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        try
        {
            lcrequest = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (e)
        {
            try
            {
                lcrequest = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (e)
            {
                // nothing
            }
        }
    }
    lcrequest.open('GET', '/japantimes.asp?name=' + escape(lcname) + '&date=' + escape(lcdate) + '&size=' + escape(lcsize) + '&diff=' + escape(lcdiff) + '&answer=' + escape(lcanswershown) + '&time=' + lntime, true);
    lcrequest.send(null);
}
