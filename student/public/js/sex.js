var it = document.getElementsByTagName('input');
var itb1 = document.querySelector('#itb1');
var itb2 = document.querySelector('#itb2');
var it1 = document.querySelector('#it1');
var it2 = document.querySelector('#it2');

// btn.onclick = function() {
//
//   if (it1.checked) {
//     alert("1");
//   }
//
//   if (it2.checked) {
//     alert("2");
//   }
// }

it1.onclick = function() {
  itb2.classList.remove('iptcolor');
  itb1.classList.add('iptcolor');
}

it2.onclick = function() {
  itb1.classList.remove('iptcolor');
  itb2.classList.add('iptcolor');
}
