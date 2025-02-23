document.addEventListener("DOMContentLoaded", function() {
  fetch("header-footer.html")
      .then(response => {
          if (!response.ok) throw new Error("Fetch failed");
          return response.text();
      })
      .then(data => {
          document.body.insertAdjacentHTML("afterbegin", data);
          document.body.insertAdjacentHTML("beforeend", data.match(/<footer>[\s\S]*<\/footer>/)[0]);
          document.body.insertAdjacentHTML("beforeend", data.match(/<div class="floating-buttons">[\s\S]*<\/div>/)[0]);
          document.body.insertAdjacentHTML("beforeend", data.match(/<div id="phonePopup"[\s\S]*<\/div>/)[0]);

          // Add event listener for outside click
          document.addEventListener("click", function(event) {
              const popup = document.getElementById("phonePopup");
              const isClickInsidePopup = popup.contains(event.target);
              const isCallButton = event.target.closest(".floating-btn") && event.target.closest(".floating-btn").getAttribute("onclick") === "showPhone()";

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