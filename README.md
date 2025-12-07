FlavorHaus – Online Food Delivery App

FlavorHaus ist eine vollständige Online-Bestellplattform, die es Nutzern ermöglicht, Gerichte zu entdecken, eine Bestellung aufzugeben und diese online zu bezahlen.
Das Projekt besteht aus einem React-Frontend und einem Spring Boot-Backend, verbunden mit einer MongoDB-Datenbank und Stripe für Zahlungen.

Ich habe dieses Projekt erstellt, um ein modernes Full-Stack-System aufzubauen, das echte Anforderungen aus dem Bereich Food Delivery abdeckt.

Features
Frontend

Moderne React-Anwendung mit Vite

I18n-Übersetzung (Deutsch & Englisch)

Benutzer-Registrierung und Login (JWT-basiert)

Übersicht aller Gerichte

Warenkorb-System

Checkout inkl. Echtzeit-Validierung

Weiterleitung zu Stripe für sichere Zahlungen

Erfolgs- und Fehlerseiten nach der Zahlung

Responsive UI mit klarer Struktur

Backend

Spring Boot REST API

MongoDB Atlas als Datenbank

JWT-Authentication

Verwaltung von Benutzern, Warenkorb, Bestellungen und Gerichten

Stripe-Integration für Zahlungen

Eigener Security Layer + CORS-Konfiguration

Deployment auf Railway



Tech Stack
Frontend

React (Vite)

React Router

Context API

Axios

i18next

Bootstrap / Custom UI

Backend

Java 17

Spring Boot

Spring Security + JWT

MongoDB Atlas

Stripe Java SDK

Deployment

Frontend: Netlify

Backend: Railway

Database: MongoDB Atlas



Live Demo

Frontend (Netlify):
https://flavorhaus.netlify.app/

Backend (Railway API):
https://foodrestapi-production-471c.up.railway.app/api/foods

Sicherheit

Passwörter werden gehasht (BCrypt)

Token-basierte Authentifizierung (JWT)

CORS sorgfältig konfiguriert (für Netlify + lokale Entwicklung)

Stripe Secret Keys werden ausschließlich als Environment-Variablen verwendet



Zahlungen mit Stripe

Die App nutzt Stripe Checkout.
Nach dem Absenden einer Bestellung wird automatisch eine Stripe-Session erstellt.
Der Nutzer wird anschließend weitergeleitet:

Erfolgreiche Zahlung → /payment/success/:orderId

Fehlgeschlagene Zahlung → /payment/fail/:orderId



Ziel des Projekts

Ich wollte ein Projekt bauen, das:

Vollständig produktionsfähig ist

Moderne Technologien kombiniert

Reale Probleme löst

Als Referenzprojekt für Bewerbungen dient

Mit FlavorHaus habe ich eine komplette Full-Stack-Anwendung gebaut, die von Registrierung bis Bezahlung funktioniert.



Status

Das Projekt ist fertig, deployed und produktionsbereit.
Weitere Features wie Admin-Panel, Bewertungen oder Echtzeit-Benachrichtigungen können in Zukunft ergänzt werden.



Autor

Abdullah Al-Qazzaz
Informatik Student
Ich freue mich über Feedback, Ideen oder Fragen zum Projekt!
