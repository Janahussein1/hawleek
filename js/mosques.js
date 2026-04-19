document.addEventListener("DOMContentLoaded", () => {
    const mosquesData = [
        {
            name: "Al-Rahman Mosque",
            description: "Main Street, 5 mins away.",
            image: "mosque.jpg",
            status: "Open Now",
            actionText: "Get Directions",
            contactText: "Call Imam",
            phone: "+20123456789"
        },
        {
            name: "Al-Nour Mosque",
            description: "West District, has women's prayer area.",
            image: "mosque2.jpg",
            status: "Friday Prayers",
            actionText: "Get Directions",
            contactText: "Call Imam",
            phone: "+20198765432"
        }
    ];

    const servicesWrapper = document.querySelector(".services-wrapper");

    if (servicesWrapper) {
        servicesWrapper.innerHTML = ""; 

        mosquesData.forEach((mosque) => {
            const cardHTML = `
                <article class="card">
                    <img src="${mosque.image}" alt="${mosque.name}">
                    <div class="cards-content">
                        <span class="status-tag">${mosque.status}</span>
                        <h3>${mosque.name}</h3>
                        <p>${mosque.description}</p>
                        <a href="directions.html" class="book-link">${mosque.actionText}</a>
                        <a href="tel:${mosque.phone}" class="call-link">${mosque.contactText}</a>
                    </div>
                </article>
            `;
            servicesWrapper.innerHTML += cardHTML;
        });
    }
});