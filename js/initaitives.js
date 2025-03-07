// document.addEventListener("DOMContentLoaded", function () {
//   const joinButtons = document.querySelectorAll(".join-btn");

//   joinButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const initiativeCard = button.closest(".initiative-card");
//       const initiativeTitle = initiativeCard.querySelector("h3").textContent;
      


//       let myInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];
//       if (!myInitiatives.includes(initiativeTitle)) {
//         myInitiatives.push(initiativeTitle);
//         localStorage.setItem("myInitiatives", JSON.stringify(myInitiatives));
//       }


//       button.textContent = "Ви приєдналися";
//       button.style.backgroundColor = "#4CAF50";
//       button.style.color = "white";
//     });
//   });
// });
