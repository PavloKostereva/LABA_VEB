document.addEventListener("DOMContentLoaded", function () {
    let initiatives = JSON.parse(localStorage.getItem("initiatives")) || [
        { id: 1, title: "Допомога дітям", date: "2025-03-10", place: "Київ", neededVolunteers: 10, img: "/img/img_initiatives/help1.jpg", description: "Допомога дітям у дитячому будинку." },
        { id: 2, title: "Прибирання парку", date: "2025-03-15", place: "Львів", neededVolunteers: 20, img: "/img/img_initiatives/help1.jpg", description: "Організоване прибирання місцевого парку." },
        { id: 3, title: "Плетіння маскувальних сіток", date: "2025-03-20", place: "Одеса", neededVolunteers: 15, img: "/img/img_initiatives/help1.jpg", description: "Допомога у плетінні сіток для військових." },
        { id: 4, title: "Допомога літнім людям", date: "2025-03-25", place: "Харків", neededVolunteers: 5, img: "/img/img_initiatives/help1.jpg", description: "Збір продуктів та ліків для людей похилого віку." },
        { id: 5, title: "Збір одягу для нужденних", date: "2025-04-05", place: "Дніпро", neededVolunteers: 12, img: "/img/img_initiatives/help1.jpg", description: "Організація збору та роздачі одягу для малозабезпечених." },
        { id: 6, title: "Еко-акція в лісі", date: "2025-04-10", place: "Луцьк", neededVolunteers: 30, img: "/img/img_initiatives/help1.jpg", description: "Прибирання сміття та висадка дерев у місцевому лісі." },
        { id: 7, title: "ПЕРЕВІРКА", date: "2025-03-07", place: "Київ", neededVolunteers: 10, img: "/img/img_initiatives/help1.jpg", description: "ПЕРЕВІРКА" },
    ];

    localStorage.setItem("initiatives", JSON.stringify(initiatives));

    const initiativesContainer = document.getElementById("initiatives-container");
    if (!initiativesContainer) return;

    const today = new Date();

    initiatives.forEach(initiative => {
        const initiativeDate = new Date(initiative.date);
        if (initiativeDate >= today) {
            const card = document.createElement("article");
            card.classList.add("initiative-card");
            card.innerHTML = `
                <img src="${initiative.img}" alt="${initiative.title}" />
                <div class="initiative-text">${initiative.title}</div>
                <h3>${initiative.title}</h3>
                <p><strong>Дата:</strong> ${initiative.date}</p>
                <p><strong>Місце:</strong> ${initiative.place}</p>
                <p><strong>Залишилось волонтерів:</strong> <span class="volunteers-needed">${initiative.neededVolunteers}</span></p>
                <p>${initiative.description}</p>
                <button class="join-btn" data-id="${initiative.id}">Приєднатися</button>
            `;
            initiativesContainer.appendChild(card);
        }
    });

    document.querySelectorAll(".join-btn").forEach(button => {
        button.addEventListener("click", function () {
            let myInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];
            const initiativeId = parseInt(this.getAttribute("data-id"));
            let initiative = initiatives.find(item => item.id === initiativeId);

            if (myInitiatives.some(item => item.id === initiativeId)) {
                alert("Ви вже приєдналися до цієї ініціативи.");
                return; 
            }

            if (initiative && initiative.neededVolunteers > 0) {
                initiative.neededVolunteers--;

                localStorage.setItem("initiatives", JSON.stringify(initiatives));

                this.parentElement.querySelector(".volunteers-needed").textContent = initiative.neededVolunteers;
                this.textContent = "Ви приєдналися";
                this.disabled = true;

                myInitiatives.push({ ...initiative });
                localStorage.setItem("myInitiatives", JSON.stringify(myInitiatives));
                console.log("Додано в myInitiatives:", myInitiatives);
            }
        });
    });
});
