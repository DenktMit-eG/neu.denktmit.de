/*
 * Simplistic javascript goodies
 * to enrich the look and feel
 */ 

// https://youmightnotneedjquery.com/
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
    
    document.querySelector("a[href='#mobile-menu']")
        .addEventListener('click', (e) => {
            document.querySelector("#mobile-menu").classList.toggle("mobile-fullscreen");
            e.preventDefault(); // don't do the actual jump
        });
    
    
});
