
var lclightgreen = '#FFFF66';
var lcyellow = '#FF9999';
var lcpaleyellow = '#66CCFF';

var lcred = '#ff0000';
var lcgreen = '#6DC023';
var lcwhite = '#ffffff';
var lcgrey = '#dddddd';
var lcblue = '#003399';
var lcshowall = -1;
var lncount = 0;
var lcwheresingletonR = '';
var lca = '';
var lcqinitial;
var laprev = new Array();
var tempinput = new Array(81);
var lnprevpos = 0;
var lcblank = 'N';

function saveboard(lccopyright)
{
	lcq = getq();

	setCookie('sudokuboard' , lcq , 30);
	setCookie('sudokucopyright' , lccopyright , 30);
	document.getElementById('showtext').innerHTML = 'The current puzzle has been saved.';
}

function changecolours()
{
	if (document.getElementById('changecolour').checked == true)
	{
		lclightgreen = '#FFFF66';
		lcyellow = '#FF9999';
		lcpaleyellow = '#66CCFF';
	}
	else
	{
		lclightgreen = '#ccff99';
		lcyellow = '#ffff00';
		lcpaleyellow = '#ffff99';
	}
	checkgrid(0,0,false,'');
}


// primarily for Android to force the chages to font sizes
function lostfocus(lntemprow , lntempcol)
{
	loinput = document.getElementById('input' + lntemprow + lntempcol);
	if (loinput.className != 'ncomp')
	{
	changefontsizes(lntemprow , lntempcol);
	}
}

function changefontsizes(lntemprow , lntempcol)
{
	loinput = document.getElementById('input' + lntemprow + lntempcol);

	if (loinput.value.length > 1)
	{
		// IE10 fix, need to set it to empty and then straight back - who knows why!
		if (loinput.className=='n')
		{
			lctempvalue = loinput.value;
			loinput.value = "    ";
			loinput.value = lctempvalue;
		}
		
		loinput.className='s';
	}
	else
	{
		// IE10 fix, need to set it to empty and then straight back - who knows why!
		if (loinput.className=='s')
		{
		lctempvalue = loinput.value;
		loinput.value = "";
		loinput.value = lctempvalue;
		}

		loinput.className='n';
	}
}


function loadboard(lcq)
{
	lcqinitial = lcq;
	lcblank = 'Y';
	if (lcq == null)
	{
		alert('No saved puzzle.');
		lcq = '';
		lcqinitial = '';
	}
	else
	{
		// make sure the cookie is correctly set
		lnocount = 0;
		lctempq = lcq;

		for (lnlupe=1;lnlupe<=81;lnlupe++)
		{
			lnwhere = lctempq.indexOf('o');

			if (lnwhere > -1)
			{
				lctempq = lctempq.substring(lnwhere + 1, lctempq.length);
				lnocount++;
			}
		}

		if (lnocount == 81)
		{
			//load board
			alert("The saved puzzle will now be loaded. Remember that 'Auto pencil marks' will not auto-run. There is no guarantee that the board was saved in a solvable state!");
			setq(lcq);
		}
		else
		{
			alert('No valid puzzle found.');
			lcq = '';
			lcqinitial = '';
		}
	}
}

function setq(lctempq)
{
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			lnwhere = lctempq.indexOf('o');
			lcnumbers = lctempq.substring(0 , lnwhere);
			lctempq = lctempq.substring(lnwhere + 1, lctempq.length);
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
			if (lcnumbers.length > 0 && isNaN(parseInt(lcnumbers)))
			{
				loinput.value = '';
			}
			else
			{
				loinput.value = lcnumbers;
			}
		}
	}
}

function exportit()
{
	document.getElementById('exportdiv').style.display = 'block';
	
	lcexport = '';
	
	lcstyle1 = 'Style 1\r\n-------\r\n';
	lcstyle2 = 'Style 2\r\n-------\r\n';
	lcstyle3 = 'Style 3\r\n-------\r\n';
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);

			if (loinput.value.length == 1 && ! isNaN(loinput.value))
			{
				lcstyle1 = lcstyle1 + loinput.value;
				lcstyle2 = lcstyle2 + loinput.value;
				lcstyle3 = lcstyle3 + ' ' + loinput.value;
			}
			else
			{
				lcstyle1 = lcstyle1 + ".";
				lcstyle2 = lcstyle2 + ".";
				lcstyle3 = lcstyle3 + " .";
				
			}
			if (lncolcounter == 3 || lncolcounter == 6)
			{
				lcstyle3 = lcstyle3 + " |";
			}
		}
		lcstyle2 = lcstyle2 + '\r\n';
		lcstyle3 = lcstyle3 + '\r\n';
		if (lnrowcounter == 3 || lnrowcounter == 6)
		{
			lcstyle3 = lcstyle3 + '-------+-------+------\r\n';
		}
	}
	document.getElementById('export').value = lcstyle1 + '\r\n\r\n' + lcstyle2 + '\r\n\r\n' + lcstyle3;
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
return null;
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setTime(exdate.getTime()+(expiredays*24*3600*1000));
document.cookie=c_name+ '=' +escape(value)+ ((expiredays==null) ? '' : '; expires='+exdate);
}

function printit(lctext , lccopyright , lcsudokuref)
{
	lcgridsize = getradiovalue('printsize');
	lcstate = getradiovalue('printstate');
	lcpencilmarks = getradiovalue('printpencilmarks');

	lcanypencilmarks = 'N';
	if (lcpencilmarks == 'Y')
	{
		// check that there are any
		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{
				loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
				if (loinput.value.length > 1)
				{
					lcanypencilmarks = 'Y';
					lnrowcounter = 9999;
					lncolcounter = 9999;
				}
			}
		}
	}

	if (lcstate != 'initial' && lcpencilmarks == 'Y' && lcanypencilmarks == 'N')
	{
		if (confirm('There are no pencil marks - run an Auto Pencil Marks?'))
		{
			processsingle();
		}
	}

	if (lcstate == 'initial')
	{
		lcq = lcqinitial;
	}
	else
	{
		// get the grid and pencil marks
		lcq = getq();
	}

	window.open('printsudoku.asp?q=' + lcq + '&text=' + lctext + '&size=' + lcgridsize + '&copyright=' + lccopyright + '&sudokuref=' + lcsudokuref + '&pencilmarks=' + lcpencilmarks);
}

function emailit(lccopyright)
{
	lcq = getq();
	window.open('sudokuemail.asp?sudoku=' + lcq + '&copyright=' + lccopyright);
}

function getq()
{
	lctempgetq = '';
	for (lnrowcountergetq = 1; lnrowcountergetq <= lnsize; lnrowcountergetq++)
	{
		for (lncolcountergetq = 1; lncolcountergetq <= lnsize; lncolcountergetq++)
		{
			loinputq = document.getElementById('input' + lnrowcountergetq + lncolcountergetq);
			lctempval = loinputq.value;
			
			if (lctempval.length > 0)
			{
				if (lctempval != parseInt(lctempval))
				{
					lctempval = "";
				}
			}

			lctempgetq = lctempgetq + lctempval + 'o';
		}
	}

	return lctempgetq;
}



function getradiovalue(lcwhich)
{
	for (lnlupe=0; lnlupe < eval('document.printform.' + lcwhich + '.length'); lnlupe++)
	{
		if (eval('document.printform.' + lcwhich + '[' + lnlupe + '].checked'))
		{
			return eval('document.printform.' + lcwhich + '[' + lnlupe + '].value');
		}
	}
}


function showtech()
{
	document.getElementById('showtecha').style.display = 'none';
	document.getElementById('showtechb').style.display = 'block';
}

function showallchange()
{
	lcshowall = document.getElementById('showall').value;
	checkgrid(0,0,false,'');
	if (lcshowall == 0)
	{
		lcshowall = -1;
	}
}

function pencilmany()
{
	document.getElementById('showtext').innerHTML = 'Auto pencil marks is running.';
	setTimeout("processmany();",1);
}

function pencilsingle()
{
	document.getElementById('showtext').innerHTML = 'Auto pencil marks is running.';
	setTimeout("processsingle();",1);
}

function processmany()
{
	storechange();
	autopencil();
	checkcomplete();
}

function processsingle()
{
	storechange();
	lcshowmessage = process();

	lcshowmessagetext = '';
	if (lcshowmessage == "N")
	{
		lcshowmessagetext = 'Auto pencil marks made no changes.';
	}
	else if (lcshowmessage == "X")
	{
		lcshowmessagetext = 'Errors Found.';
		document.getElementById('showwrong').checked = true;
		document.getElementById('colourgrid').checked = true;
	}
	checkgrid(0,0,true,lcshowmessagetext);
	document.getElementById('autopencil').checked = false;
	checkcomplete();
}

function autopencil()
{
	lcstart = 'START';
	lcend = 'END';

	lcshowmessage = "Y";
	while (lcshowmessage == "Y")
	{
		lcshowmessage = process();
	}

	lcshowmessagetext = '';
	if (lcshowmessage == "X")
	{
		lcshowmessagetext = 'Errors Found.';
		document.getElementById('showwrong').checked = true;
		document.getElementById('colourgrid').checked = true;
	}
	else if (lcshowmessage == "N")
	{
		lcshowmessagetext = 'Auto pencil marks is complete.';
	}

	checkgrid(0,0,true,lcshowmessagetext);
	document.getElementById('autopencil').checked = false;
}

function process()
{
	lcretval = "N";

	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
			
			tempinput[(lnrowcounter - 1) * lnsize + lncolcounter] = loinput.value;

			if (loinput.value.length == 0)
			{
				// assume all, and then remove them as we go across the rows/cols/3x3
				loinput.value = '123456789';
			}

		}
	}

	// update pencil marks - rows and cols
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
			
			if (loinput.value.length != 1)
			{
				// remove from rows
				for (lntempcounter = 1; lntempcounter <= lnsize; lntempcounter++)
				{
					if (tempinput[(lntempcounter - 1) * lnsize + lncolcounter].length == 1 && lntempcounter != lnrowcounter && loinput.value.indexOf(document.getElementById('input' + lntempcounter + lncolcounter).value) != -1)
					{
						loinput.value = loinput.value.replace(document.getElementById('input' + lntempcounter + lncolcounter).value , '');
						lcretval = "Y";
					}

					if (tempinput[(lnrowcounter - 1) * lnsize + lntempcounter].length == 1 && lntempcounter != lncolcounter && loinput.value.indexOf(document.getElementById('input' + lnrowcounter + lntempcounter).value) != -1)
					{
						loinput.value = loinput.value.replace(document.getElementById('input' + lnrowcounter + lntempcounter).value , '');
						lcretval = "Y";
					}

				}
			}
		}
	}

	// pencil marks on 3x3 now
	for (ln3row = 1 ; ln3row <= 3 ; ln3row++)
	{
		for (ln3col = 1 ; ln3col <= 3 ; ln3col++)
		{
			for (lnouter = 1 ; lnouter <= lnsize ; lnouter++)
			{
				lnsquare1 = getnumber(ln3row , ln3col , lnouter);
				losquare1 = document.getElementById('input' + lnsquare1);
				lnvalue = losquare1.value;

				if (lnvalue.length != 1)
				{
					for (lninner = 1 ; lninner <= lnsize ; lninner++)
					{
						lnsquare2 = getnumber(ln3row , ln3col , lninner);
						// getnumber returns it in the form row_col, and we want absolute posn in the array i.e. 21 maps to 10 (I could have written a new function, but couldn't be bothered)
						lntempsquare2 = tempinput[(Math.floor(lnsquare2/10) - 1) * lnsize + lnsquare2 - Math.floor(lnsquare2/10) * 10];
						if (lntempsquare2.length == 1 && lnsquare1 != lnsquare2 && losquare1.value.indexOf(lntempsquare2) != -1)
						{
							losquare1.value = losquare1.value.replace(lntempsquare2 , '');
							lcretval = "Y";
						}
					}
				}
			}
		}
	}
	
	// make sure there are no blank squares
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
			if (loinput.value.length == 0)
			{
				lcretval = "X";
				lncolcounter = 9999;
				lnrowcounter = 9999;
			}
		}
	}

return lcretval;
}


function storechange()
{
	laprev[lnprevpos++] = getq();
}

function undo()
{
	setq(laprev[--lnprevpos]);
	checkgrid(0,0,true,'');
	if (lnprevpos == 0)
	{
		lnprevpos = 1;
	}
	laprev[lnprevpos] = '';
}

function getkey(e)
{
if (window.event)
return window.event.keyCode;
else if (e)
return e.which;
else
return null;
}

function keypressed(lcevent , lcrowkeyup , lccolkeyup , lcchecheckall)
{
	try
	{
		lckey = getkey(lcevent);

		if (lcevent.ctrlKey && (lckey==40 || lckey==38 || lckey==37 || lckey==39))
		{
			// down
			if (lckey == 40)
			{
				lcrowkeyup++;
				if (lcrowkeyup > 9)
				{
				lcrowkeyup = 1;
				}
			}

			// up
			if (lckey == 38)
			{
				lcrowkeyup--;
				if (lcrowkeyup < 1)
				{
				lcrowkeyup = 9;
				}
			}

			// left
			if (lckey == 37)
			{
				lccolkeyup--;
				if (lccolkeyup < 1)
				{
				lccolkeyup = 9;
				}
			}

			// right
			if (lckey == 39)
			{
				lccolkeyup++;
				if (lccolkeyup > 9)
				{
				lccolkeyup = 1;
				}
			}
			
			// set focus
			loinput = document.getElementById('input' + lcrowkeyup + lccolkeyup);
			loinput.focus();
		}
		else if (lcevent.shiftKey && lckey >= 48 && lckey <= 57)
		{
			cleardodgyletters(lcrowkeyup , lccolkeyup);
			document.getElementById('showall').options[lckey - 48].selected = true;
			lcshowall = lckey - 48;
			checkgrid(lcrowkeyup , lccolkeyup , lcchecheckall , '');
		}
		// TAB
		else if (lckey == 13)
		{
			// do nothing!
		}
		else if (lckey == 9)
		{
			// do nothing!
		}
		// autopencil
		else if (lckey == 65)
		{
			cleardodgyletters(lcrowkeyup , lccolkeyup);
			document.getElementById('autopencil').click();
		}
		// pin
		else if (lckey == 80)
		{
			cleardodgyletters(lcrowkeyup , lccolkeyup);
			document.getElementById('showsinglecandidates').click();
		}
		else
		{
			resetquestionsquare(lcrowkeyup , lccolkeyup);
			checkgrid(lcrowkeyup , lccolkeyup , lcchecheckall , '');
			checkcomplete();
		}
	} 
	catch(e)
	{
		checkgrid(lcrowkeyup , lccolkeyup , lcchecheckall , '');
	}
}

function cleardodgyletters(lcrowkeyup , lccolkeyup)
{
	resetquestionsquare(lcrowkeyup , lccolkeyup);
	loinput = document.getElementById('input' + lcrowkeyup + lccolkeyup);
	loinput.value = loinput.value.replace(/[^1-9]/ig , '');
}

// don't allow them to overwrite the question
function resetquestionsquare(lcrowkeyup , lccolkeyup)
{
	lcq = lcqinitial;
	
	// only bother for a normal 81 length sudoku
	if (lcq.length == 81)
	{
		if (lcrowkeyup > 0 || lccolkeyup > 0)
		{
			loinput = document.getElementById('input' + lcrowkeyup + lccolkeyup);
			lnqvalue = lcq.substring((lcrowkeyup-1) * lnsize + lccolkeyup - 1, (lcrowkeyup-1) * lnsize + lccolkeyup);
			if (lnqvalue != '.')
			{
				loinput.value = lnqvalue;
			}
		}

	}
}

function checkgrid(lcrowkeyup , lccolkeyup , lcchecheckall , lcshowtext)
{
	// what is the Sudoku and answer
	lcq = lcqinitial;

	if (document.getElementById('showwrong').checked == true && lcshowerrorwarningshown == "N")
	{
		lcshowerrorwarningshown = "Y";
		alert("Be careful leaving 'Show Errors' checked if you are using pencil marks, as you will see the errors in red as you enter more than one digit in a square.");
	}
	

	// recolour grid correctly before error colouring
	// only bother if they've clicked the option though or autopencil marks is running
	if (document.getElementById('colourgrid').checked == true || document.getElementById('showwrong').checked == true || lcchecheckall == true || lcshowall != -1)
	{

		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{
				// set class based on how many in cell - default to n
				loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
				lotd = document.getElementById('td' + lnrowcounter + lncolcounter);
				if (lcshowall != -1 && lcshowall != 0)
				{
					lotd.style.backgroundColor = lcwhite;
				}
				else
				{
					lotd.style.backgroundColor = lacolours[lnrowcounter][lncolcounter];
				}
			
				if (loinput.value.length > 1)
				{
					loinput.className = 's';
				}
				else
				{
					loinput.className = 'n';
				}

				// font color - only if ticked - only check those with one digit in - default to nothing
				loinput.style.color = '';
				if (document.getElementById('showwrong').checked == true)
				{
					if (loinput.value.length == 1)
					{
						lnavalue = lca.substring((lnrowcounter-1) * lnsize + lncolcounter - 1, (lnrowcounter-1) * lnsize + lncolcounter);
						if (lnavalue != '.')
						{
							// if number is incorrect then show as red
							if (loinput.value != lnavalue && loinput.value != '')
							{
								loinput.style.color = lcred; 
								lcshowtext = 'Errors Found.';
							}
							// valid number as green
							else
							{
								//loinput.style.color = lcgreen;
							}
						}
					}
				}

				// grey background for given squares (don't do for blank sudoku)
				lnqvalue = lcq.substring((lnrowcounter-1) * lnsize + lncolcounter - 1, (lnrowcounter-1) * lnsize + lncolcounter);
				if (lnqvalue != '.' && lcblank == 'N')
				{
					lotd.style.backgroundColor = lcgrey;
					loinput.style.color = lcblue;
				}

				// change colour of all 5's (say)
				if (lcshowall != -1)
				{
					if (loinput.value.indexOf(lcshowall) != -1)
					{
						lotd.style.backgroundColor = lclightgreen;
						
						// is this a singleton?
						if (lcwheresingletonR == '' + lnrowcounter + lncolcounter)
						{
							lotd.style.backgroundColor = lcpaleyellow;
						}
					}
				}
			}
		}
	}
	else
	{
		// set class based on how many in cell - default to n
		if (lcrowkeyup != 0 && lccolkeyup != 0)
		{
			changefontsizes(lcrowkeyup , lccolkeyup);
		}
	}

	// colour the squares yellow?
	if (document.getElementById('colourgrid').checked == true)
	{
		lcshowtext = colourgrid(lcshowtext);
	}

	document.getElementById('showtext').innerHTML = lcshowtext;
	lcwheresingletonR = '';
}

function checkcomplete()
{
	// complete? 
	lcerror = 'N';
	lcshowtext = '';
	lcallsingle = 'Y';
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
			lnavalue = lca.substring((lnrowcounter-1) * lnsize + lncolcounter - 1, (lnrowcounter-1) * lnsize + lncolcounter);
			
			if (loinput.value.length != 1)
			{
				lcallsingle = "N";
			}
			
			if (loinput.value != lnavalue)
			{
				// flag as error and quit loops
				lcerror = 'Y';
			}
		}
	}
	
	// now check that we have a completed grid, but not correct
	if (lcerror != "N" && lcallsingle == "Y")
	{
		if (document.getElementById('showwrong').checked == false)
		{
			document.getElementById('showwrong').click();
		}
		if (document.getElementById('colourgrid').checked == false)
		{
			document.getElementById('colourgrid').click();
		}
	}
	else if (lcerror == 'N')
	{
		lcshowtext = 'Puzzle Solved.';
		stopclock();
		if (lcshowall != 0)
		{
			document.getElementById('showall').options[0].selected = true;
			lcshowall = 0;
			checkgrid(0,0,false,'');
		}
		// colour all as green now complete - but if show errors is ticked, untick it
		if (document.getElementById('showwrong').checked == true)
		{
			document.getElementById('showwrong').click();
		}

		// colour all green
		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{

				loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
				lotd = document.getElementById('td' + lnrowcounter + lncolcounter);

				lcfound = "N";
				if (colorToHex(lacolours[lnrowcounter][lncolcounter]) == "#ffff99")
				{
					lotd.style.backgroundColor = "#CCFFCC";
					lcfound = "Y";
				}
				if (colorToHex(lacolours[lnrowcounter][lncolcounter]) == "#ccffff")
				{
					lotd.style.backgroundColor = "#99FF99";
					lcfound = "Y";
				}
				if (colorToHex(lacolours[lnrowcounter][lncolcounter]) == "#ffcc99")
				{
					lotd.style.backgroundColor = "#66CC66";
					lcfound = "Y";
				}
				if (colorToHex(lacolours[lnrowcounter][lncolcounter]) == "#ffccff")
				{
					lotd.style.backgroundColor = "#33FF33";
					lcfound = "Y";
				}

				if (lcfound == "N")
				{
					loinput.className = 'ncomp';
				}
			}
		}
	}
	
	if (lcshowtext.length != 0)
	{
		document.getElementById('showtext').innerHTML = lcshowtext;
	}
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};
function colourgrid(lcshowtext)
{
	lcretval = lcshowtext;
	
	// check rows and cols at same time
	for (lncounter = 1 ; lncounter <= lnsize ; lncounter++)
	{
		for (lnouter = 1 ; lnouter <= lnsize ; lnouter++)
		{
			// store the value for the current square, if this is repeated then change all those the same
			lnvaluerow = document.getElementById('input' + lncounter + lnouter).value;
			lnvaluecol = document.getElementById('input' + lnouter + lncounter).value;
			
			for (lninner = lnouter + 1; lninner <= lnsize ; lninner++)
			{
				// check across rows
				if (document.getElementById('input' + lncounter + lninner).value == lnvaluerow && lnvaluerow != '' && document.getElementById('input' + lncounter + lninner).value.length == 1)
				{
					document.getElementById('td' + lncounter + lnouter).style.backgroundColor = lcyellow;
					document.getElementById('td' + lncounter + lninner).style.backgroundColor = lcyellow;
					lcretval = 'Duplicates Found.';
				}

				// check down columns
				if (document.getElementById('input' + lninner + lncounter).value == lnvaluecol && lnvaluecol != '' && document.getElementById('input' + lninner + lncounter).value.length == 1)
				{
					document.getElementById('td' + lnouter + lncounter).style.backgroundColor = lcyellow;
					document.getElementById('td' + lninner + lncounter).style.backgroundColor = lcyellow;
					lcretval = 'Duplicates Found.';
				}
			}
		}
	}
	
	// check 3x3
	for (ln3row = 1 ; ln3row <= 3 ; ln3row++)
	{
		for (ln3col = 1 ; ln3col <= 3 ; ln3col++)
		{
			for (lnouter = 1 ; lnouter <= lnsize ; lnouter++)
			{
				lnsquare1 = getnumber(ln3row , ln3col , lnouter);
				lnvalue = document.getElementById('input' + lnsquare1).value;
				for (lninner = lnouter + 1 ; lninner <= lnsize ; lninner++)
				{
					lnsquare2 = getnumber(ln3row , ln3col , lninner);
					if (document.getElementById('input' + lnsquare2).value == lnvalue && lnvalue != '' && document.getElementById('input' + lnsquare2).value.length == 1)
					{
						document.getElementById('td' + lnsquare1).style.backgroundColor = lcyellow;
						document.getElementById('td' + lnsquare2).style.backgroundColor = lcyellow;
						lcretval = 'Duplicates Found.';
					}
				}
			}
		}
	}
	
	return lcretval;
}

// used to move around the 3x3 sqaures
function getnumber(lna , lnb , lnc)
{
	lnretval = 3 * (lna - 1) + 1;
	lnretval = lnretval + (3 * (lnb - 1) + 1) * 10;
	lnretval = lnretval + (lnc - 1);

	if (lnc>=4 && lnc<=6)
	{
		lnretval = lnretval + 7;
	}
	if (lnc>=7 && lnc<=9)
	{
		lnretval = lnretval + 14;
	}

	return lnretval;
}

// show all answers
function showanswer()
{
	if (confirm ('Are you sure you want to see the answer?'))
	{
		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{
				lnavalue = lca.substring((lnrowcounter-1) * lnsize + lncolcounter - 1, (lnrowcounter-1) * lnsize + lncolcounter);
				document.getElementById('input' + lnrowcounter + lncolcounter).value = lnavalue;
			}
		}
		document.getElementById('autopencil').click();
	}
}

// reset grid
function resetgrid()
{
	if (confirm ('Are you sure you want restart?'))
	{
		// reset drop down list
		document.getElementById('showall').options[0].selected = true;
		lcshowall = 0;
		
		lncount = 0;
		lcq = lcqinitial;

		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{
				document.getElementById('input' + lnrowcounter + lncolcounter).value = '';
			}
		}

		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{
				lnqvalue = lcq.substring((lnrowcounter-1) * lnsize + lncolcounter - 1, (lnrowcounter-1) * lnsize + lncolcounter);
				if (lnqvalue != '.')
				{
				document.getElementById('input' + lnrowcounter + lncolcounter).value = lnqvalue;
				}
			}
		}
		// clear history and reset pointer
		laprev = new Array();
		lnprevpos = 0;
		storechange();
		checkgrid(0,0,true,'');
		
		// set focus
		loinput = document.getElementById('input11');
		loinput.focus();
		// stop the clock that's running
		stopclock();
		startclock();
	}
}

function callsinglecandidates()
{
	// don't run until every square has something in it!
	lcallhavedata = "Y";
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('input' + lnrowcounter + lncolcounter);
			
			if (loinput.value.length == 0)
			{
				lcallhavedata = "N";
			}
		}
	}
	
	if (lcallhavedata == "Y")
	{
		setTimeout("singlecandidates();",1);
	}
	else
	{
		alert("Cannot show a pinned square until all of the squares have pencil marks.");
		document.getElementById('showsinglecandidates').checked = false;
	}

}

function singlecandidates()
{
	lnfound = 0;
	lcwheresingletonR = '';
	lcwheresingletonC = '';
	lcshowmessagetext = '';
	
	for (lnnumber = 1; lnnumber <= lnsize; lnnumber++)
	{
		// check 3x3
		for (ln3row = 1 ; ln3row <= 3 ; ln3row++)
		{
			for (ln3col = 1 ; ln3col <= 3 ; ln3col++)
			{
				ln3x3count = 0;
				for (lninner = 1 ; lninner <= lnsize ; lninner++)
				{
					lnsquare1 = getnumber(ln3row , ln3col , lninner);
					losquare1 = document.getElementById('input' + lnsquare1);
					
					if (losquare1.value.length > 1 && losquare1.value.indexOf(lnnumber) != -1)
					{
						ln3x3count++;
						lcwheresingletonR = lnsquare1;
					}
					
					// if the digit is already discovered in this block then count it as high
					if (losquare1.value.length == 1 && losquare1.value.indexOf(lnnumber) != -1)
					{
						ln3x3count = 9999;
					}
				}
				
				// if count is 1
				if (ln3x3count == 1)
				{
					lnfound = lnnumber;
					lnnumber = 9999;
					ln3row = 9999;
					ln3col = 9999;
					
					// set singleton to that value
					losquare1 = document.getElementById('input' + lcwheresingletonR);
					losquare1.value = lnfound;
				}
			}
		}

		if (lnfound == 0)
		{
			// check rows and cols
			for (lncounter1 = 1; lncounter1 <= lnsize; lncounter1++)
			{
				lnrowcount = 0;
				lncolcount = 0;
				
				for (lncounter2 = 1; lncounter2 <= lnsize; lncounter2++)
				{
					if (document.getElementById('input' + lncounter1 + lncounter2).value.length > 1 && document.getElementById('input' + lncounter1 + lncounter2).value.indexOf(lnnumber) != -1)
					{
						lnrowcount++;
						lcwheresingletonR = '' + lncounter1 + lncounter2;
					}
					if (document.getElementById('input' + lncounter2 + lncounter1).value.length > 1 && document.getElementById('input' + lncounter2 + lncounter1).value.indexOf(lnnumber) != -1)
					{
						lncolcount++;
						lcwheresingletonC = '' + lncounter2 + lncounter1;
					}

					// if the digit is already discovered then count it as high
					if (document.getElementById('input' + lncounter1 + lncounter2).value.length == 1 && document.getElementById('input' + lncounter1 + lncounter2).value.indexOf(lnnumber) != -1)
					{
						lnrowcount = 9999;
					}
					// if the digit is already discovered then count it as high
					if (document.getElementById('input' + lncounter2 + lncounter1).value.length == 1 && document.getElementById('input' + lncounter2 + lncounter1).value.indexOf(lnnumber) != -1)
					{
						lncolcount = 9999;
					}
				}

				if (lnrowcount == 1 || lncolcount == 1)
				{
					lnfound = lnnumber;
					lnnumber = 9999;
					// if a column single, then set R var
					if (lncolcount == 1)
					{
						lcwheresingletonR = lcwheresingletonC;
					}
					// set singleton to that value
					losquare1 = document.getElementById('input' + lcwheresingletonR);
					losquare1.value = lnfound;
				}
			}
		}
	}

	lcshowall = lnfound;
	
	if (lnfound == 0)
	{
		lcshowmessagetext = 'No pinned squares found.';
	}

	document.getElementById('showall').options[lnfound].selected = true;
	checkgrid(0,0,false,lcshowmessagetext);
	document.getElementById('showsinglecandidates').checked = false;
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

function showclock()
{
	lnnow = new Date();	
	lnseconds = Math.round((lnnow.getTime() - lnstart.getTime()) / 1000);
	loobject = getObject('clockinfo');

	lnmins = Math.floor(lnseconds / 60);
	lnsecs = lnseconds - (60 * lnmins);
	if (lnsecs < 10)
	{
		lnsecs = '0' + lnsecs;
	}

	lcclock = setTimeout("showclock()", 1000);

	if (loobject==null)
	{
		return;
	}

	loobject.innerHTML = 'Time Taken: ' + lnmins + ':' + lnsecs;
}

function startclock()
{
	lnstart = new Date();
	showclock();
}

function stopclock()
{
	clearTimeout(lcclock);
}

function hideclock()
{
	loobject = getObject('showclock');
	loobject.style.display = 'none';

	loobject = getObject('hideclock');
	loobject.style.display = 'block';
}

function unhideclock()
{
	loobject = getObject('hideclock');
	loobject.style.display = 'none';

	loobject = getObject('showclock');
	loobject.style.display = 'block';
}

function checknew()
{
	if (document.getElementById("showtext").innerHTML.toUpperCase().indexOf("SOLVED") == -1)
	{
		return confirm ("Are you sure? Your current puzzle will be lost!");
	}
	else
	{
		return true;
	}
}
//-->
