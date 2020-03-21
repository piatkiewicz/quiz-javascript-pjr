zawodnicy = [
    { id: "ronaldo", imie: "Cristiano Ronaldo" },
    { id: "messi", imie: "Lionel Messi" },
    { id: "neuer", imie: "Manuel Neuer" },
    { id: "marcelo", imie: "Marcelo" },
    { id: "kante", imie: "N’Golo Kanté" },
];

pytania = [
    {
        tresc: "Na jakiej pozycji lubisz grać najbardziej?",
        odpowiedzi: [
            { tresc: "Bramkarz", punkty: [{ zawodnik: "neuer", wartosc: 2 }] },
            { tresc: "Obrońca", punkty: [{ zawodnik: "marcelo", wartosc: 2 }] },
            { tresc: "Pomocnik", punkty: [{ zawodnik: "kante", wartosc: 2 }] },
            { tresc: "Napastnik", punkty: [{ zawodnik: "ronaldo", wartosc: 2 }, { zawodnik: "messi", wartosc: 2 }] }
        ]
    },
    {
        tresc: "Co jest dla Ciebie ważne w piłce?",
        odpowiedzi: [
            {
                tresc: "Zabawa",
                punkty: [
                    { zawodnik: "marcelo", wartosc: 3 },
                    { zawodnik: "kante", wartosc: 2 }
                ]
            },
            {
                tresc: "Zwycięstwo",
                punkty: []
            },
            {
                tresc: "Być w centrum uwagi",
                punkty: [
                    { zawodnik: "ronaldo", wartosc: 3 }
                ]
            }
        ]
    },
    {
        tresc: "Jaka jest Twoja ulubiona liga?",
        odpowiedzi: [
            { tresc: "Bundesliga", punkty: [{ zawodnik: "neuer", wartosc: 2 }] },
            { tresc: "Premier League", punkty: [{ zawodnik: "kante", wartosc: 2 }] },
            { tresc: "Primera Division", punkty: [{ zawodnik: "messi", wartosc: 2 }, { zawodnik: "ronaldo", wartosc: 1 }, { zawodnik: "marcelo", wartosc: 2 }] },
            { tresc: "Serie A", punkty: [{ zawodnik: "ronaldo", wartosc: 2 }] },

        ]
    }
];



function restart() {
    zawodnicy = zawodnicy.map(
        zawodnik => ({ ...zawodnik, podobienstwo: 0 })
    );
    nrPytania = -1;
    zaladujPytanie();
}

function zaladujPytanie() {
    nrPytania++;

    document.getElementById("odpowiedzi").innerHTML = "";

    if (nrPytania < pytania.length) {
        document.getElementById("naglowek").innerHTML =
            pytania[nrPytania].tresc;

        pytania[nrPytania].odpowiedzi.forEach(
            (odpowiedz, nrOdpowiedzi) => {
                document.getElementById("odpowiedzi")
                    .innerHTML +=
                    `<button
                    class="odpowiedz"
                    onclick="wybierzOdpowiedz(${nrOdpowiedzi})">
                        ${odpowiedz.tresc}
                    </button>`;
            });
    }
    else {
        let podobienstwa = zawodnicy.map(
            zawodnik => zawodnik.podobienstwo
        );
        let maksPodobienstwo = Math.max(...podobienstwa);

        let wybraniZawodnicy = zawodnicy.filter(zawodnik =>
            zawodnik.podobienstwo == maksPodobienstwo);

        let wynik = wybraniZawodnicy.map(zawodnik =>
            zawodnik.imie).join(', ');

        document.getElementById("naglowek").innerHTML =
            `Jesteś podobny do: ${wynik}`;
    }
}

function wybierzOdpowiedz(nrOdpowiedzi) {
    let punkty = pytania[nrPytania]
        .odpowiedzi[nrOdpowiedzi]
        .punkty;

    punkty.forEach((punktyZawodnika) => {
        zawodnicy = zawodnicy.map((zawodnik) =>
            (zawodnik.id == punktyZawodnika.zawodnik ?
                {
                    ...zawodnik,
                    podobienstwo: zawodnik.podobienstwo + punktyZawodnika.wartosc
                } : zawodnik));
    });

    zaladujPytanie();
}

restart();