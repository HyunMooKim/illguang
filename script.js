// script.js
document.addEventListener("DOMContentLoaded", function() {
  fetch("header-footer.html")
      .then(response => {
          if (!response.ok) throw new Error("Fetch failed");
          return response.text();
      })
      .then(data => {
          // Insert only header at the top
          const headerContent = data.match(/<header>[\s\S]*<\/header>/)[0];
          document.body.insertAdjacentHTML("afterbegin", headerContent);

          // Insert footer and other elements at the bottom
          const footerContent = data.match(/<footer>[\s\S]*<\/footer>/)[0];
          const floatingButtons = data.match(/<div class="floating-buttons">[\s\S]*<\/div>/)[0];
          const phonePopup = data.match(/<div id="phonePopup"[\s\S]*<\/div>/)[0];
          
          document.body.insertAdjacentHTML("beforeend", footerContent);
          document.body.insertAdjacentHTML("beforeend", floatingButtons);
          document.body.insertAdjacentHTML("beforeend", phonePopup);

          // Add event listener for outside click
          document.addEventListener("click", function(event) {
              const popup = document.getElementById("phonePopup");
              const isClickInsidePopup = popup.contains(event.target);
              const isCallButton = event.target.closest(".floating-btn") && 
                                 event.target.closest(".floating-btn").getAttribute("onclick") === "showPhone()";

              if (popup.style.display === "block" && !isClickInsidePopup && !isCallButton) {
                  hidePhone();
              }
          });
      })
      .catch(error => console.error("Error:", error));
});

function showPhone() {
  document.getElementById("phonePopup").style.display = "block";
}

function hidePhone() {
  document.getElementById("phonePopup").style.display = "none";
}

function goToDirections() {
  window.location.href = "location.html";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}