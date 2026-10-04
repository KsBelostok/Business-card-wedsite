/* ================================================= */
/* MOBILE MENU */
/* ================================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");


menuToggle.addEventListener("click", () => {

    navigation.classList.toggle("is-open");

});


navigation.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("is-open");

    });

});


/* ================================================= */
/* MODAL WINDOWS */
/* ================================================= */

const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");

let previouslyFocused = null;


function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) {
        return;
    }

    previouslyFocused = document.activeElement;


    modals.forEach((item) => {

        item.classList.remove("is-open");

        item.setAttribute(
            "aria-hidden",
            "true"
        );

    });


    modal.classList.add("is-open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add("modal-open");


    const closeButton =
        modal.querySelector(".modal-close");


    if (closeButton) {

        setTimeout(() => {
            closeButton.focus();
        }, 100);

    }

}


function closeModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("is-open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    const anotherOpen =
        document.querySelector(".modal.is-open");


    if (!anotherOpen) {

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (previouslyFocused) {

        previouslyFocused.focus();

    }

}


modalTriggers.forEach((trigger) => {

    trigger.addEventListener("click", () => {

        openModal(
            trigger.dataset.modal
        );

    });

});


/* Закрытие по крестику и фону */

modals.forEach((modal) => {

    modal.querySelectorAll("[data-close]")
        .forEach((element) => {

            element.addEventListener("click", () => {

                closeModal(modal);

            });

        });

});


/* ================================================= */
/* ESC */
/* ================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        const openedModal =
            document.querySelector(".modal.is-open");


        if (openedModal) {

            closeModal(openedModal);

        }

    }

});


/* ================================================= */
/* CLICK OUTSIDE MOBILE MENU */
/* ================================================= */

document.addEventListener("click", (event) => {

    if (
        navigation.classList.contains("is-open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        navigation.classList.remove("is-open");

    }

});


/* ================================================= */
/* SCROLL ANIMATIONS */
/* ================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-section"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================================================= */
/* НЕМНОГО ПОЯВЛЕНИЯ ДЛЯ КАРТОЧЕК */
/* ================================================= */

const cards =
    document.querySelectorAll(
        ".interest-card"
    );


const cardObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const card =
                    entry.target;


                const index =
                    [...cards].indexOf(card);


                setTimeout(() => {

                    card.classList.add(
                        "card-visible"
                    );

                }, index * 80);


                observer.unobserve(card);

            });

        },
        {
            threshold: 0.15
        }
    );


cards.forEach((card) => {

    cardObserver.observe(card);

});


/* ================================================= */
/* ЛЁГКИЙ PARALLAX ДЛЯ HERO */
/* ================================================= */

const heroPhoto =
    document.querySelector(".hero-photo-wrap");


if (heroPhoto) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;


            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;


            heroPhoto.style.setProperty(
                "--mouse-x",
                `${x * 3}px`
            );


            heroPhoto.style.setProperty(
                "--mouse-y",
                `${y * 3}px`
            );

        }
    );

}


/* ================================================= */
/* ПЛАВНОЕ ЗАКРЫТИЕ МЕНЮ ПРИ RESIZE */
/* ================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 650 &&
            navigation.classList.contains(
                "is-open"
            )
        ) {

            navigation.classList.remove(
                "is-open"
            );

        }

    }
);