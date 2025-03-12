// document.addEventListener("DOMContentLoaded", function () {
//     const myInitiativesContainer = document.querySelector("main");
//     let myInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];

//     console.log("Отримані ініціативи з localStorage:", myInitiatives);

//     if (myInitiatives.length > 0) {
//         myInitiativesContainer.innerHTML = `<h2>Мої ініціативи</h2>
//                                             <div class="grid-container" id="my-initiatives-container"></div>`;

//         const myInitiativesList = document.getElementById("my-initiatives-container");

//         myInitiatives.forEach(initiative => {
//             const card = document.createElement("article");
//             card.classList.add("initiative-card");
//             card.innerHTML = `
//                 <img src="${initiative.img}" alt="${initiative.title}" />
//                 <div class="initiative-text">${initiative.title}</div>
//                 <h3>${initiative.title}</h3>
//                 <p><strong>Дата:</strong> ${initiative.date}</p>
//                 <p><strong>Місце:</strong> ${initiative.place}</p>
//                 <p><strong>Залишилось волонтерів:</strong> ${initiative.neededVolunteers}</p>
//                 <p>${initiative.description}</p>
//                 <button class="leave-btn" data-id="${initiative.id}">Від'єднатися</button>
//             `;
//             myInitiativesList.appendChild(card);
//         });

//         document.querySelectorAll(".leave-btn").forEach(button => {
//             button.addEventListener("click", function () {
//                 const initiativeId = parseInt(this.getAttribute("data-id"));
                
//                 let initiative = myInitiatives.find(item => item.id === initiativeId);
                
//                 if (initiative) {
//                     // волонтер +1
//                     initiative.neededVolunteers++;

//                     // оновлення локал стор.
//                     let initiatives = JSON.parse(localStorage.getItem("initiatives")) || [];
//                     let initiativeIndex = initiatives.findIndex(item => item.id === initiativeId);
//                     if (initiativeIndex !== -1) {
//                         initiatives[initiativeIndex] = initiative; // оновлення ініціативи в загальному списку
//                         localStorage.setItem("initiatives", JSON.stringify(initiatives));
//                     }

//                     myInitiatives = myInitiatives.filter(item => item.id !== initiativeId);
//                     localStorage.setItem("myInitiatives", JSON.stringify(myInitiatives));

//                     this.parentElement.remove();
//                     console.log("Від'єднано від ініціативи. Залишилося ініціатив: ", myInitiatives);
//                 }
//             });
//         });
//     } else {
//         myInitiativesContainer.innerHTML = `<h2>Мої ініціативи</h2>
//                                             <p>Ви ще не приєдналися до жодної ініціативи.</p>`;
//     }
// });
