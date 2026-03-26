#!/usr/bin/env node
/**
 * Writes admin/i18n/<lang>/translations.json from English keys (same as en/translations.json).
 * Run from repo root: node scripts/fill-admin-i18n.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { it, nl, pl, pt, ru, uk, zhCn } from "./locales-extra.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const adminDir = join(__dirname, "..", "admin", "i18n");
const enPath = join(adminDir, "en", "translations.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));
const keys = Object.keys(en).sort();

const locales = {
    fr: {
        Authentication: "Authentification",
        Settings: "Paramètres",
        Ideas: "Idées",
        About: "À propos",
        "Connect your Ultrahuman Ring": "Connectez votre bague Ultrahuman",
        "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
            "Cet adaptateur lit les données de santé de votre bague Ultrahuman via l’API Partenaire. Vous avez besoin d’identifiants API fournis par Ultrahuman.",
        "How to get your credentials": "Comment obtenir vos identifiants",
        "1. Send an email to feedback@ultrahuman.com requesting API access":
            "1. Envoyez un e-mail à feedback@ultrahuman.com pour demander l’accès à l’API",
        "2. You will receive an API Key and an Access Code":
            "2. Vous recevrez une clé API et un code d’accès",
        "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
            "3. Saisissez le code d’accès dans l’app Ultrahuman (Profil → Réglages → Partner ID)",
        "4. Enter the API Key and your Ultrahuman email below":
            "4. Saisissez la clé API et votre e-mail Ultrahuman ci-dessous",
        "Email template (copy and send to feedback@ultrahuman.com)":
            "Modèle d’e-mail (copier et envoyer à feedback@ultrahuman.com)",
        "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
            "Sélectionnez le texte ci-dessus, copiez-le (Ctrl+C / Cmd+C) et collez-le dans votre e-mail.",
        "Your credentials": "Vos identifiants",
        "API Key": "Clé API",
        "Paste your API key here": "Collez votre clé API ici",
        "The API key you received from Ultrahuman": "La clé API reçue d’Ultrahuman",
        "Ultrahuman Email": "E-mail Ultrahuman",
        "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
            "L’adresse e-mail liée à votre compte Ultrahuman. Avec Apple Privacy Relay, elle se termine par @privaterelay.appleid.com. Retrouvez-la dans l’app : Profil → Réglages (icône engrenage) → Compte (en haut).",
        "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
            "Important : le code d’accès doit être saisi dans l’app Ultrahuman sous Profil → Réglages → Partner ID. Sans cela, l’API ne peut pas accéder à vos données.",
        "Support this free adapter – buy me a coffee!": "Soutenez cet adaptateur gratuit – offrez-moi un café !",
        "Polling Settings": "Paramètres d’interrogation",
        "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
            "La bague Ultrahuman synchronise les données périodiquement avec le cloud (pas en temps réel). Une interrogation trop fréquente gaspille des ressources et peut déclencher des limites de débit.",
        "Polling Interval (minutes)": "Intervalle d’interrogation (minutes)",
        "How often to fetch new data from the API. Recommended: 30 minutes.":
            "Fréquence de récupération des données depuis l’API. Recommandé : 30 minutes.",
        "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
            "Recommandé : 30 min | Minimum : 5 min | Maximum : 1440 min (24 h)",
        "Ideas for using your health data": "Idées pour utiliser vos données de santé",
        "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
            "Voici quelques idées pour utiliser vos données Ultrahuman dans ioBroker :",
        Visualizations: "Visualisations",
        "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
            "• Afficher le score et l’efficacité du sommeil sur un tableau de bord (VIS, Jarvis, iQontrol)",
        "• Create charts showing HRV and heart rate trends over time":
            "• Créer des graphiques des tendances VFC et fréquence cardiaque",
        "• Show sleep stages (REM, deep, light) as a pie chart":
            "• Afficher les phases de sommeil (REM, profond, léger) en diagramme circulaire",
        "• Display daily step count with progress bar towards your goal":
            "• Afficher le nombre de pas quotidien avec une barre de progression vers l’objectif",
        Automations: "Automatisations",
        "• Gentle wake-up light when sleep efficiency was low":
            "• Lumière de réveil douce lorsque l’efficacité du sommeil était faible",
        "• Reminder to go to bed earlier if sleep score drops below threshold":
            "• Rappel de vous coucher plus tôt si le score de sommeil passe sous le seuil",
        "• Adjust room temperature based on skin temperature trends":
            "• Ajuster la température de la pièce selon les tendances de température cutanée",
        "• Morning briefing via Alexa/Google with last night's sleep summary":
            "• Briefing matinal via Alexa/Google avec le résumé du sommeil de la nuit",
        "• Activate relaxation mode (dim lights, calm music) when HRV is low":
            "• Activer le mode détente (lumière tamisée, musique calme) lorsque la VFC est basse",
        "• Send push notification when daily step goal is reached":
            "• Notification push lorsque l’objectif quotidien de pas est atteint",
        "Notifications & Logging": "Notifications et journalisation",
        "• Log all health data to InfluxDB for long-term analysis":
            "• Enregistrer toutes les données de santé dans InfluxDB pour analyse long terme",
        "• Weekly health report via Telegram or email":
            "• Rapport de santé hebdomadaire via Telegram ou e-mail",
        "• Alert when resting heart rate is unusually high (possible illness)":
            "• Alerte si la fréquence cardiaque au repos est anormalement élevée (maladie possible)",
        "• Compare sleep data with weather or calendar events":
            "• Comparer les données de sommeil avec la météo ou le calendrier",
        "About this Adapter": "À propos de cet adaptateur",
        "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
            "ioBroker.ultrahuman lit les indicateurs de santé de votre bague Ultrahuman et les expose comme objets ioBroker.",
        "Available data": "Données disponibles",
        "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
            "Sommeil – Efficacité, durée, phases (REM, profond, léger), score, cycles",
        "Heart rate – Resting, night, average, min/max, trend":
            "Fréquence cardiaque – Repos, nuit, moyenne, min/max, tendance",
        "HRV – Average, sleep, min/max, trend": "VFC – Moyenne, sommeil, min/max, tendance",
        "SpO2 – If supported by your ring": "SpO2 – Si pris en charge par votre bague",
        "Skin temperature": "Température cutanée",
        "Activity – Steps, active minutes, movement/recovery index, VO2 max":
            "Activité – Pas, minutes actives, indice mouvement/récupération, VO2 max",
        Links: "Liens",
        "GitHub Repository": "Dépôt GitHub",
        "Report an issue": "Signaler un problème",
        Author: "Auteur",
        "SmarterPapa – Smart Home Tips & Inspirations":
            "SmarterPapa – Astuces et inspirations pour la maison connectée",
        "License: MIT": "Licence : MIT",
    },
    es: {
    Authentication: "Autenticación",
    Settings: "Ajustes",
    Ideas: "Sugerencias",
        About: "Acerca de",
        "Connect your Ultrahuman Ring": "Conecta tu anillo Ultrahuman",
        "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
            "Este adaptador lee datos de salud de tu anillo Ultrahuman mediante la API de socios. Necesitas credenciales API de Ultrahuman.",
        "How to get your credentials": "Cómo obtener tus credenciales",
        "1. Send an email to feedback@ultrahuman.com requesting API access":
            "1. Envía un correo a feedback@ultrahuman.com solicitando acceso a la API",
        "2. You will receive an API Key and an Access Code":
            "2. Recibirás una clave API y un código de acceso",
        "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
            "3. Introduce el código en la app Ultrahuman (Perfil → Ajustes → Partner ID)",
        "4. Enter the API Key and your Ultrahuman email below":
            "4. Introduce la clave API y tu correo Ultrahuman abajo",
        "Email template (copy and send to feedback@ultrahuman.com)":
            "Plantilla de correo (copiar y enviar a feedback@ultrahuman.com)",
        "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
            "Selecciona el texto de arriba, cópialo (Ctrl+C / Cmd+C) y pégalo en tu correo.",
        "Your credentials": "Tus credenciales",
        "API Key": "Clave API",
        "Paste your API key here": "Pega tu clave API aquí",
        "The API key you received from Ultrahuman": "La clave API que recibiste de Ultrahuman",
        "Ultrahuman Email": "Correo Ultrahuman",
        "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
            "El correo vinculado a tu cuenta Ultrahuman. Con Apple Privacy Relay termina en @privaterelay.appleid.com. Búscalo en la app: Perfil → Ajustes (engranaje) → Cuenta (arriba).",
        "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
            "Importante: el código de acceso debe introducirse en la app bajo Perfil → Ajustes → Partner ID. Sin esto la API no puede acceder a tus datos.",
        "Support this free adapter – buy me a coffee!": "Apoya este adaptador gratuito – ¡invítame a un café!",
        "Polling Settings": "Ajustes de consulta",
        "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
            "El anillo sincroniza datos periódicamente con la nube (no en tiempo real). Consultar demasiado a menudo desperdicia recursos y puede activar límites.",
        "Polling Interval (minutes)": "Intervalo de consulta (minutos)",
        "How often to fetch new data from the API. Recommended: 30 minutes.":
            "Con qué frecuencia obtener datos de la API. Recomendado: 30 minutos.",
        "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
            "Recomendado: 30 min | Mínimo: 5 min | Máximo: 1440 min (24 h)",
        "Ideas for using your health data": "Ideas para usar tus datos de salud",
        "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
            "Algunas ideas para usar tus datos Ultrahuman en ioBroker:",
        Visualizations: "Visualizaciones",
        "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
            "• Mostrar puntuación y eficiencia del sueño en un panel (VIS, Jarvis, iQontrol)",
        "• Create charts showing HRV and heart rate trends over time":
            "• Crear gráficos de tendencias de VFC y frecuencia cardíaca",
        "• Show sleep stages (REM, deep, light) as a pie chart":
            "• Mostrar fases del sueño (REM, profundo, ligero) en un gráfico circular",
        "• Display daily step count with progress bar towards your goal":
            "• Mostrar pasos diarios con barra de progreso hacia tu objetivo",
        Automations: "Automatizaciones",
        "• Gentle wake-up light when sleep efficiency was low":
            "• Luz de despertar suave si la eficiencia del sueño fue baja",
        "• Reminder to go to bed earlier if sleep score drops below threshold":
            "• Recordatorio para acostarse antes si la puntuación del sueño cae del umbral",
        "• Adjust room temperature based on skin temperature trends":
            "• Ajustar la temperatura según tendencias de temperatura cutánea",
        "• Morning briefing via Alexa/Google with last night's sleep summary":
            "• Resumen matutino con Alexa/Google con el sueño de la noche",
        "• Activate relaxation mode (dim lights, calm music) when HRV is low":
            "• Modo relajación (luces tenues, música tranquila) cuando la VFC es baja",
        "• Send push notification when daily step goal is reached":
            "• Notificación push al alcanzar el objetivo diario de pasos",
        "Notifications & Logging": "Notificaciones y registro",
        "• Log all health data to InfluxDB for long-term analysis":
            "• Registrar todos los datos de salud en InfluxDB para análisis a largo plazo",
        "• Weekly health report via Telegram or email":
            "• Informe semanal de salud por Telegram o correo",
        "• Alert when resting heart rate is unusually high (possible illness)":
            "• Alerta si la frecuencia en reposo es inusualmente alta (posible enfermedad)",
        "• Compare sleep data with weather or calendar events":
            "• Comparar datos de sueño con el tiempo o el calendario",
        "About this Adapter": "Acerca de este adaptador",
        "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
            "ioBroker.ultrahuman lee métricas de salud de tu anillo Ultrahuman y las expone como objetos ioBroker.",
        "Available data": "Datos disponibles",
        "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
            "Sueño – Eficiencia, duración, fases (REM, profundo, ligero), puntuación, ciclos",
        "Heart rate – Resting, night, average, min/max, trend":
            "Frecuencia cardíaca – Reposo, noche, media, min/máx, tendencia",
        "HRV – Average, sleep, min/max, trend": "VFC – Media, sueño, min/máx, tendencia",
        "SpO2 – If supported by your ring": "SpO2 – Si tu anillo lo admite",
        "Skin temperature": "Temperatura cutánea",
        "Activity – Steps, active minutes, movement/recovery index, VO2 max":
            "Actividad – Pasos, minutos activos, índice movimiento/recuperación, VO2 máx",
        Links: "Enlaces",
        "GitHub Repository": "Repositorio en GitHub",
        "Report an issue": "Informar de un problema",
        Author: "Autor",
        "SmarterPapa – Smart Home Tips & Inspirations":
            "SmarterPapa – Consejos e inspiración para el hogar inteligente",
        "License: MIT": "Licencia: MIT",
    },
    it,
    nl,
    pl,
    pt,
    ru,
    uk,
    "zh-cn": zhCn,
};

function buildOut(lang, map) {
    const out = {};
    for (const k of keys) {
        out[k] = map[k] ?? en[k];
    }
    return JSON.stringify(out, null, 2) + "\n";
}

for (const lang of ["fr", "es", "it", "nl", "pl", "pt", "ru", "uk", "zh-cn"]) {
    const map = locales[lang];
    if (!map) {
        continue;
    }
    const dir = join(adminDir, lang);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "translations.json"), buildOut(lang, map), "utf8");
}

console.log("Updated admin i18n for fr, es, it, nl, pl, pt, ru, uk, zh-cn.");
