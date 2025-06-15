
# 🎭 TicketApp – System Rezerwacji Miejsc na Wydarzenia

## 📌 Tytuł projektu
**TicketApp – System Rezerwacji Biletów na Wydarzenia Kulturalne**

## 🎯 Cel projektu

Celem projektu jest stworzenie aplikacji umożliwiającej przeglądanie wydarzeń oraz interaktywną rezerwację miejsc. Projekt realizuje wymagania funkcjonalne zadania 5: użytkownik może przeglądać wydarzenia, rezerwować miejsca (poprzez wybór z siatki 10×8), a także anulować wszystkie dokonane rezerwacje.

---

## 🔧 Funkcjonalności aplikacji

- ✅ Przegląd wydarzeń z wykorzystaniem Ticketmaster API
- ✅ Widok szczegółów wydarzenia (nazwa, data, miejsce, cena, obraz)
- ✅ Interaktywna siatka miejsc (10 rzędów × 8 kolumn)
- ✅ Możliwość rezerwacji wielu miejsc
- ✅ Przycisk „Clear All” – usuwa wszystkie rezerwacje danego wydarzenia
- ✅ Dane rezerwacji zapisywane w bazie danych MongoDB
- ✅ Server-Side Rendering z wykorzystaniem EJS
- ✅ Minimalistyczny, estetyczny interfejs

---

## ⚙️ Technologie

- Node.js
- Express.js
- EJS (SSR)
- MongoDB + Mongoose
- Axios (do komunikacji z API)
- CSS (własny arkusz stylów)

---

## 📂 Struktura aplikacji

```
ProjektMVC/
├── app.js                      # Plik główny aplikacji + połączenie z MongoDB
├── config.js                   # Klucz API i konfiguracja portu
├── models/
│   └── Reservation.js          # Model Mongoose – struktura danych rezerwacji
├── controllers/
│   ├── eventsController.js     # Obsługuje renderowanie listy wydarzeń i widoku szczegółów
│   ├── reserveController.js    # Obsługuje zapis rezerwacji do bazy danych
│   └── cancelController.js     # Usuwa wszystkie miejsca zarezerwowane na dane wydarzenie
├── routing/
│   ├── events.js               # Ścieżki /events, /events/music, /events/event/:id
│   ├── reserve.js              # Ścieżki POST /reserve oraz /cancel-all
│   └── home.js, logout.js, kill.js
├── views/
│   ├── events/
│   │   ├── home.ejs            # Główna lista wydarzeń (z kartami)
│   │   ├── music.ejs, standup.ejs
│   │   └── details.ejs         # Interaktywny widok szczegółów i rezerwacji
│   ├── partials/
│   │   └── navigation.ejs      # Nawigacja główna
│   └── 404.ejs                 # Strona błędu
├── public/
│   └── css/main.css            # Stylowanie: karty wydarzeń, mapa miejsc
```

---

## 🧠 Logika działania

### `eventsController.js`
- Łączy się z API Ticketmaster
- Renderuje widoki: lista wydarzeń (`home.ejs`, `music.ejs`, `standup.ejs`)
- Widok szczegółów (`details.ejs`) otrzymuje również `reservedSeats` z bazy

### `reserveController.js`
- Przyjmuje dane `eventId` i `selectedSeats` z formularza
- Sprawdza czy miejsca są wolne, a potem zapisuje do MongoDB
- Po zapisaniu przekierowuje z powrotem do strony wydarzenia

### `cancelController.js`
- `cancelAllSeats`: usuwa wszystkie miejsca zarezerwowane na dane `eventId`
- Używana przez przycisk „Clear All” w widoku `details.ejs`

### `Reservation.js`
- Model Mongoose z polami:
  - `eventId: String`
  - `reservedSeats: [{ row: Number, col: Number }]`

---

## ▶️ Jak uruchomić aplikację

1. Sklonuj repozytorium:
```bash
git clone https://github.com/vnebra4niy/ProjektMVC_5.git
cd ProjektMVC_5
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj klucz Ticketmaster API w pliku `config.js`:
```js
module.exports = {
  PORT: 3000,
  TICKETMASTER_KEY: 'twoj_klucz_api',
  DB_USER = "user",
  DB_PASSWORD = "password323"
};
```

4. Skonfiguruj połączenie z MongoDB Atlas w `app.js`:
```js
mongoose.connect('mongodb+srv://${user}:${haslo}@cluster.mongodb.net/ticketapp')
```

5. Uruchom serwer:
```bash
npm start
```

---

## 🧪 Przykładowe dane w MongoDB

```json
{
  "eventId": "G5vYZ9f2fd3e4",
  "reservedSeats": [
    { "row": 2, "col": 3 },
    { "row": 4, "col": 5 }
  ]
}
```

---

## 📦 Wykorzystane biblioteki

- `express` – serwer HTTP
- `ejs` – renderowanie widoków
- `mongoose` – MongoDB ODM
- `axios` – pobieranie danych z zewnętrznego API
- `body-parser` – obsługa formularzy

---

## ✅ Zgodność z wymaganiami zadania

Projekt spełnia wymagania zadania 5:

- [x] Przegląd dostępnych wydarzeń
- [x] Możliwość rezerwacji (interaktywny wybór miejsc)
- [x] Możliwość anulowania rezerwacji („Clear All”)
- [x] Implementacja wzorca MVC + SSR
- [x] Estetyczne stylowanie i modularna architektura
- [x] Obecność dokumentacji

---

## 👤 Autor

**Imię i nazwisko:** Mikita Kutsayeu
**Numer indeksu:** 48860
**Temat projektu:** Zadanie 5 – System rezerwacji biletów na wydarzenia  
