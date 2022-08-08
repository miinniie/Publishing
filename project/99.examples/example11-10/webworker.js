var count = 0;
function timedCount()
{
  postMessage("1초마다 숫자가 올라갈 겁니다. : " + count);
  count++;
  setTimeout("timedCount()", 1000);
}
 
timedCount();