var key = "lopadotemachoselachogaleokranioleipsanodrimhypotrimmatosilphioparaomelitokatakechymenokichlepikossyphophattoperisteralektryonoptekephalliokigklopeleiolagoiosiraiobaphetraganopterygon";

var sentence = "also you are not h";

function retNum(character, i)
{
  return character.charCodeAt(i) - 96;
}

function retChar(num)
{
  return String.fromCharCode(num);
}

function retCypher(key_p, sentence_p)
{
  kek = '';
  for(i = 0; i < sentence_p.length; i++)
  {
    if(sentence_p.charAt(i) == ' ')
      kek += ' ';
    else
      kek += retChar(((retNum(sentence_p,i) + retNum(key_p,i))%26)+97);
  }
  return kek;
}

console.log(retCypher(key,sentence));