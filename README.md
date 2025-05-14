System Zarządzania Grafikiem (Frontend)

Frontend aplikacji do zarządzania grafikami agentów Call Center w firmie telekomunikacyjnej. Pozwala na przeglądanie, tworzenie i zarządzanie grafikami pracy agentów na podstawie prognoz zapotrzebowania, dostępności oraz wydajności pracowników.

## Stack technologiczny

- **React** (Vite)
- **Tailwind CSS**
- **React Router**
- **REST API** (komunikacja z backendem Laravel)

---

## Wymagania

- Node.js >= 16
- npm lub yarn

---

## Instalacja i uruchomienie

1. **Klonowanie repozytorium**

   ```bash
   git clone <adres-repo-frontend>
   cd callcenter-frontend
   ```

2. **Instalacja zależności**

   ```bash
   npm install
   # lub
   yarn install
   ```

3. **Konfiguracja adresu API**

   Upewnij się, że adresy endpointów API w plikach frontendowych wskazują na uruchomiony backend (domyślnie: `http://localhost:8000/api`). Jeśli backend działa na innym porcie lub adresie, zaktualizuj odpowiednio konfigurację (np. w pliku `src/api.js`).

4. **Uruchomienie aplikacji developerskiej**

   ```bash
   npm run dev
   # lub
   yarn dev
   ```

   Aplikacja będzie dostępna pod adresem: [http://localhost:5173](http://localhost:5173) (domyślnie dla Vite).

---

## Struktura projektu

- `src/pages/` – główne widoki (Dashboard, Dodaj Pracownika, Grafik dostępności, Przeglądaj Grafik, itp.)
- `src/components/` – komponenty wielokrotnego użytku
- `src/api.js` – funkcje do komunikacji z backendem (REST API)

---

## Główne funkcjonalności

- **Panel główny** – szybki dostęp do najważniejszych funkcji (dodawanie pracowników, przeglądanie grafików, zarządzanie dostępnością)
- **Dodawanie pracowników** – formularz do wprowadzania nowych agentów i przypisywania ich do kolejek
- **Grafik dostępności** – przeglądanie dostępności agentów
- **Przeglądanie grafików pracy** – generowanie i podgląd docelowych grafików na podstawie prognoz i dostępności
- **Prognozy obciążenia** – wizualizacja zapotrzebowania na połączenia w poszczególnych kolejkach

---

## Komunikacja z backendem

Aplikacja korzysta z REST API udostępnianego przez backend Laravel. Przykładowe endpointy:

- `POST /agents` – dodawanie agenta
- `GET /queues` – lista kolejek
- `GET /queue/{id}/agents-schedule` – dostępność agentów w kolejce
- `GET /queue/{id}/work-load` – prognoza obciążenia
- `GET /work-schedule/queue/{id}` – docelowy grafik pracy
- `POST /work-schedule/generate` – generowanie grafiku

Szczegóły i opis endpointów znajdziesz w dokumentacji backendu.

---

## Uruchomienie całości (backend + frontend)

1. Uruchom backend zgodnie z instrukcją w repozytorium backendu.
2. Uruchom frontend według powyższych kroków.
3. Upewnij się, że adresy API w frontendzie wskazują na backend (np. `http://localhost:8000/api`).

---