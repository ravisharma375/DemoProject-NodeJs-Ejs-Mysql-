function replaceData(msg){
  msg = msg.replace(/"/g,'');
  msg = msg.replace(/\//g,'');
  return msg;
}