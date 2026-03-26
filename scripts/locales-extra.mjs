/** Admin UI strings (keys = English from i18n/en). */
export const it = {
    Authentication: "Autenticazione",
    Settings: "Impostazioni",
    Ideas: "Idee",
    About: "Informazioni",
    "Connect your Ultrahuman Ring": "Collega il tuo anello Ultrahuman",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "Questo adattatore legge i dati sanitari dal tuo anello Ultrahuman tramite la Partner API. Servono credenziali API ottenute da Ultrahuman.",
    "How to get your credentials": "Come ottenere le credenziali",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. Invia un'e-mail a feedback@ultrahuman.com richiedendo l'accesso all'API",
    "2. You will receive an API Key and an Access Code":
        "2. Riceverai una chiave API e un codice di accesso",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. Inserisci il codice nell'app Ultrahuman (Profilo → Impostazioni → Partner ID)",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. Inserisci la chiave API e la tua e-mail Ultrahuman qui sotto",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "Modello e-mail (copia e invia a feedback@ultrahuman.com)",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "Seleziona il testo sopra, copialo (Ctrl+C / Cmd+C) e incollalo nell'e-mail.",
    "Your credentials": "Le tue credenziali",
    "API Key": "Chiave API",
    "Paste your API key here": "Incolla qui la tua chiave API",
    "The API key you received from Ultrahuman": "La chiave API ricevuta da Ultrahuman",
    "Ultrahuman Email": "E-mail Ultrahuman",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "L'indirizzo e-mail collegato al tuo account Ultrahuman. Con Apple Privacy Relay termina con @privaterelay.appleid.com. Lo trovi nell'app: Profilo → Impostazioni (ingranaggio) → Account (in alto).",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "Importante: il codice di accesso va inserito nell'app sotto Profilo → Impostazioni → Partner ID. Senza di esso l'API non può accedere ai dati.",
    "Support this free adapter – buy me a coffee!": "Sostieni questo adattatore gratuito – offrimi un caffè!",
    "Polling Settings": "Impostazioni polling",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "L'anello sincronizza i dati periodicamente sul cloud (non in tempo reale). Un polling troppo frequente spreca risorse e può attivare limiti di frequenza.",
    "Polling Interval (minutes)": "Intervallo di polling (minuti)",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "Frequenza di recupero dati dall'API. Consigliato: 30 minuti.",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "Consigliato: 30 min | Minimo: 5 min | Massimo: 1440 min (24 h)",
    "Ideas for using your health data": "Idee per usare i dati sulla salute",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "Alcune idee per usare i dati Ultrahuman in ioBroker:",
    Visualizations: "Visualizzazioni",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• Mostrare punteggio ed efficienza del sonno su una dashboard (VIS, Jarvis, iQontrol)",
    "• Create charts showing HRV and heart rate trends over time":
        "• Creare grafici di tendenza HRV e frequenza cardiaca",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• Mostrare le fasi del sonno (REM, profondo, leggero) come torta",
    "• Display daily step count with progress bar towards your goal":
        "• Mostrare i passi giornalieri con barra di progresso verso l'obiettivo",
    Automations: "Automazioni",
    "• Gentle wake-up light when sleep efficiency was low":
        "• Luce di risveglio dolce se l'efficienza del sonno era bassa",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• Promemoria di andare a letto prima se il punteggio scende sotto la soglia",
    "• Adjust room temperature based on skin temperature trends":
        "• Regolare la temperatura in base alle tendenze della temperatura cutanea",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• Briefing mattutino con Alexa/Google con riepilogo del sonno",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• Modalità relax (luci basse, musica calma) quando l'HRV è bassa",
    "• Send push notification when daily step goal is reached":
        "• Notifica push quando si raggiunge l'obiettivo giornaliero di passi",
    "Notifications & Logging": "Notifiche e registrazione",
    "• Log all health data to InfluxDB for long-term analysis":
        "• Registrare tutti i dati sanitari in InfluxDB per analisi a lungo termine",
    "• Weekly health report via Telegram or email":
        "• Report settimanale via Telegram o e-mail",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• Avviso se la frequenza a riposo è insolitamente alta (possibile malattia)",
    "• Compare sleep data with weather or calendar events":
        "• Confrontare i dati del sonno con meteo o calendario",
    "About this Adapter": "Informazioni su questo adattatore",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman legge le metriche sanitarie dal tuo anello Ultrahuman e le espone come oggetti ioBroker.",
    "Available data": "Dati disponibili",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "Sonno – Efficienza, durata, fasi (REM, profondo, leggero), punteggio, cicli",
    "Heart rate – Resting, night, average, min/max, trend":
        "Frequenza cardiaca – Riposo, notte, media, min/max, tendenza",
    "HRV – Average, sleep, min/max, trend": "HRV – Media, sonno, min/max, tendenza",
    "SpO2 – If supported by your ring": "SpO2 – Se supportato dall'anello",
    "Skin temperature": "Temperatura cutanea",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "Attività – Passi, minuti attivi, indice movimento/recupero, VO2 max",
    Links: "Collegamenti",
    "GitHub Repository": "Repository GitHub",
    "Report an issue": "Segnala un problema",
    Author: "Autore",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa – Suggerimenti e ispirazioni per la smart home",
    "License: MIT": "Licenza: MIT",
};

export const nl = {
    Authentication: "Authenticatie",
    Settings: "Instellingen",
    Ideas: "Ideeën",
    About: "Over",
    "Connect your Ultrahuman Ring": "Verbind je Ultrahuman Ring",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "Deze adapter leest gezondheidsgegevens van je Ultrahuman Ring via de Partner-API. Je hebt API-referenties nodig van Ultrahuman.",
    "How to get your credentials": "Zo krijg je je gegevens",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. Stuur een e-mail naar feedback@ultrahuman.com om API-toegang te vragen",
    "2. You will receive an API Key and an Access Code":
        "2. Je ontvangt een API-sleutel en een toegangscode",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. Voer de toegangscode in de Ultrahuman-app in (Profiel → Instellingen → Partner ID)",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. Voer de API-sleutel en je Ultrahuman e-mail hieronder in",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "E-mailsjabloon (kopiëren en naar feedback@ultrahuman.com sturen)",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "Selecteer de tekst hierboven, kopieer (Ctrl+C / Cmd+C) en plak in je e-mail.",
    "Your credentials": "Jouw gegevens",
    "API Key": "API-sleutel",
    "Paste your API key here": "Plak je API-sleutel hier",
    "The API key you received from Ultrahuman": "De API-sleutel die je van Ultrahuman hebt gekregen",
    "Ultrahuman Email": "Ultrahuman e-mail",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "Het e-mailadres gekoppeld aan je Ultrahuman-account. Met Apple Privacy Relay eindigt het op @privaterelay.appleid.com. Vind het in de app: Profiel → Instellingen (tandwiel) → Account (bovenaan).",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "Belangrijk: de toegangscode moet in de app onder Profiel → Instellingen → Partner ID staan. Zonder deze code heeft de API geen toegang.",
    "Support this free adapter – buy me a coffee!": "Steun deze gratis adapter – trakteer me op een koffie!",
    "Polling Settings": "Polling-instellingen",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "De ring synchroniseert periodiek met de cloud (niet realtime). Te vaak pollen verspilt resources en kan rate limits activeren.",
    "Polling Interval (minutes)": "Polling-interval (minuten)",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "Hoe vaak nieuwe data ophalen. Aanbevolen: 30 minuten.",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "Aanbevolen: 30 min | Minimum: 5 min | Maximum: 1440 min (24 uur)",
    "Ideas for using your health data": "Ideeën voor je gezondheidsgegevens",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "Ideeën om je Ultrahuman-gegevens in ioBroker te gebruiken:",
    Visualizations: "Visualisaties",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• Slaapscore en -efficiëntie op een dashboard (VIS, Jarvis, iQontrol)",
    "• Create charts showing HRV and heart rate trends over time":
        "• Grafieken met HRV- en hartritmetrends",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• Slaapfasen (REM, diep, licht) als taartdiagram",
    "• Display daily step count with progress bar towards your goal":
        "• Dagelijkse stappen met voortgangsbalk naar je doel",
    Automations: "Automatisering",
    "• Gentle wake-up light when sleep efficiency was low":
        "• Zacht wakkerlicht als de slaapefficiëntie laag was",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• Herinnering eerder naar bed als de slaapscore onder de drempel zakt",
    "• Adjust room temperature based on skin temperature trends":
        "• Kamertemperatuur aanpassen op basis van huidtemperatuurtrends",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• Ochtendbriefing via Alexa/Google met slaapsamenvatting",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• Ontspanningsmodus (gedimd licht, rustige muziek) bij lage HRV",
    "• Send push notification when daily step goal is reached":
        "• Pushmelding bij behalen van dagelijks stappendoel",
    "Notifications & Logging": "Meldingen en loggen",
    "• Log all health data to InfluxDB for long-term analysis":
        "• Alle gezondheidsdata naar InfluxDB voor langetermijnanalyse",
    "• Weekly health report via Telegram or email":
        "• Wekelijks gezondheidsrapport via Telegram of e-mail",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• Waarschuwing bij ongewoon hoge rusthartslag (mogelijke ziekte)",
    "• Compare sleep data with weather or calendar events":
        "• Slaapgegevens vergelijken met weer of agenda",
    "About this Adapter": "Over deze adapter",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman leest gezondheidsmetingen van je Ultrahuman Ring en biedt ze als ioBroker-objecten.",
    "Available data": "Beschikbare gegevens",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "Slaap – Efficiëntie, duur, fasen (REM, diep, licht), score, cycli",
    "Heart rate – Resting, night, average, min/max, trend":
        "Hartslag – Rust, nacht, gemiddelde, min/max, trend",
    "HRV – Average, sleep, min/max, trend": "HRV – Gemiddeld, slaap, min/max, trend",
    "SpO2 – If supported by your ring": "SpO2 – Indien ondersteund door je ring",
    "Skin temperature": "Huidtemperatuur",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "Activiteit – Stappen, actieve minuten, bewegings/herstelindex, VO2 max",
    Links: "Koppelingen",
    "GitHub Repository": "GitHub-repository",
    "Report an issue": "Probleem melden",
    Author: "Auteur",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa – Smart home tips en inspiratie",
    "License: MIT": "Licentie: MIT",
};

export const pl = {
    Authentication: "Uwierzytelnianie",
    Settings: "Ustawienia",
    Ideas: "Pomysły",
    About: "O adapterze",
    "Connect your Ultrahuman Ring": "Połącz pierścień Ultrahuman",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "Adapter odczytuje dane zdrowotne z pierścienia Ultrahuman przez Partner API. Potrzebujesz danych dostępowych od Ultrahuman.",
    "How to get your credentials": "Jak uzyskać dane dostępowe",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. Wyślij e-mail na feedback@ultrahuman.com z prośbą o dostęp do API",
    "2. You will receive an API Key and an Access Code":
        "2. Otrzymasz klucz API i kod dostępu",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. Wpisz kod w aplikacji Ultrahuman (Profil → Ustawienia → Partner ID)",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. Wpisz klucz API i e-mail Ultrahuman poniżej",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "Szablon e-maila (skopiuj i wyślij na feedback@ultrahuman.com)",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "Zaznacz tekst powyżej, skopiuj (Ctrl+C / Cmd+C) i wklej do wiadomości.",
    "Your credentials": "Twoje dane",
    "API Key": "Klucz API",
    "Paste your API key here": "Wklej tutaj klucz API",
    "The API key you received from Ultrahuman": "Klucz API otrzymany od Ultrahuman",
    "Ultrahuman Email": "E-mail Ultrahuman",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "Adres e-mail powiązany z kontem Ultrahuman. Przy Apple Privacy Relay kończy się na @privaterelay.appleid.com. Znajdziesz go w aplikacji: Profil → Ustawienia (koło zębate) → Konto (na górze).",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "Ważne: kod dostępu musi być wpisany w aplikacji w Profil → Ustawienia → Partner ID. Bez tego API nie uzyska dostępu do danych.",
    "Support this free adapter – buy me a coffee!": "Wesprzyj ten darmowy adapter – postaw mi kawę!",
    "Polling Settings": "Ustawienia odpytywania",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "Pierścień synchronizuje dane okresowo z chmurą (nie w czasie rzeczywistym). Zbyt częste odpytywanie marnuje zasoby i może uruchomić limity.",
    "Polling Interval (minutes)": "Interwał odpytywania (minuty)",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "Jak często pobierać dane z API. Zalecane: 30 minut.",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "Zalecane: 30 min | Minimum: 5 min | Maksimum: 1440 min (24 h)",
    "Ideas for using your health data": "Pomysły na wykorzystanie danych zdrowotnych",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "Pomysły na wykorzystanie danych Ultrahuman w ioBroker:",
    Visualizations: "Wizualizacje",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• Wyświetlaj wynik i efektywność snu na pulpicie (VIS, Jarvis, iQontrol)",
    "• Create charts showing HRV and heart rate trends over time":
        "• Wykresy trendów HRV i tętna",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• Fazy snu (REM, głęboki, lekki) jako wykres kołowy",
    "• Display daily step count with progress bar towards your goal":
        "• Dzienne kroki z paskiem postępu do celu",
    Automations: "Automatyzacje",
    "• Gentle wake-up light when sleep efficiency was low":
        "• Łagodne światło budzenia przy niskiej efektywności snu",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• Przypomnienie o wcześniejszym pójściu spać gdy wynik snu spadnie",
    "• Adjust room temperature based on skin temperature trends":
        "• Dostosuj temperaturę pomieszczenia do trendów temperatury skóry",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• Poranny briefing przez Alexa/Google z podsumowaniem snu",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• Tryb relaksu (przyciemnione światło, spokojna muzyka) przy niskim HRV",
    "• Send push notification when daily step goal is reached":
        "• Powiadomienie push po osiągnięciu dziennego celu kroków",
    "Notifications & Logging": "Powiadomienia i logowanie",
    "• Log all health data to InfluxDB for long-term analysis":
        "• Zapis wszystkich danych zdrowotnych do InfluxDB",
    "• Weekly health report via Telegram or email":
        "• Cotygodniowy raport zdrowotny przez Telegram lub e-mail",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• Alert przy nietypowo wysokim spoczynkowym tętnie (możliwa choroba)",
    "• Compare sleep data with weather or calendar events":
        "• Porównaj dane snu z pogodą lub kalendarzem",
    "About this Adapter": "O tym adapterze",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman odczytuje metryki zdrowotne z pierścienia Ultrahuman i udostępnia je jako obiekty ioBroker.",
    "Available data": "Dostępne dane",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "Sen – Efektywność, czas, fazy (REM, głęboki, lekki), wynik, cykle",
    "Heart rate – Resting, night, average, min/max, trend":
        "Tętno – Spoczynkowe, nocne, średnie, min/max, trend",
    "HRV – Average, sleep, min/max, trend": "HRV – Średnia, sen, min/max, trend",
    "SpO2 – If supported by your ring": "SpO2 – Jeśli pierścień obsługuje",
    "Skin temperature": "Temperatura skóry",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "Aktywność – Kroki, aktywne minuty, indeks ruchu/regeneracji, VO2 max",
    Links: "Odnośniki",
    "GitHub Repository": "Repozytorium GitHub",
    "Report an issue": "Zgłoś problem",
    Author: "Autor",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa – Wskazówki i inspiracje smart home",
    "License: MIT": "Licencja: MIT",
};

export const pt = {
    Authentication: "Autenticação",
    Settings: "Definições",
    Ideas: "Ideias",
    About: "Sobre",
    "Connect your Ultrahuman Ring": "Ligue o seu anel Ultrahuman",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "Este adaptador lê dados de saúde do seu anel Ultrahuman através da API Partner. Precisa de credenciais API da Ultrahuman.",
    "How to get your credentials": "Como obter as suas credenciais",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. Envie um e-mail a feedback@ultrahuman.com a solicitar acesso à API",
    "2. You will receive an API Key and an Access Code":
        "2. Receberá uma chave API e um código de acesso",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. Introduza o código na app Ultrahuman (Perfil → Definições → Partner ID)",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. Introduza a chave API e o seu e-mail Ultrahuman abaixo",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "Modelo de e-mail (copiar e enviar para feedback@ultrahuman.com)",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "Selecione o texto acima, copie (Ctrl+C / Cmd+C) e cole no e-mail.",
    "Your credentials": "As suas credenciais",
    "API Key": "Chave API",
    "Paste your API key here": "Cole a sua chave API aqui",
    "The API key you received from Ultrahuman": "A chave API recebida da Ultrahuman",
    "Ultrahuman Email": "E-mail Ultrahuman",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "O e-mail associado à sua conta Ultrahuman. Com Apple Privacy Relay termina em @privaterelay.appleid.com. Encontre-o na app: Perfil → Definições (engrenagem) → Conta (no topo).",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "Importante: o código de acesso deve ser introduzido na app em Perfil → Definições → Partner ID. Sem isto a API não acede aos dados.",
    "Support this free adapter – buy me a coffee!": "Apoie este adaptador gratuito – pague-me um café!",
    "Polling Settings": "Definições de consulta",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "O anel sincroniza dados periodicamente com a cloud (não em tempo real). Consultas demasiado frequentes desperdiçam recursos e podem ativar limites.",
    "Polling Interval (minutes)": "Intervalo de consulta (minutos)",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "Com que frequência obter dados da API. Recomendado: 30 minutos.",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "Recomendado: 30 min | Mínimo: 5 min | Máximo: 1440 min (24 h)",
    "Ideas for using your health data": "Ideias para usar os seus dados de saúde",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "Algumas ideias para usar os dados Ultrahuman no ioBroker:",
    Visualizations: "Visualizações",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• Mostrar pontuação e eficiência do sono num painel (VIS, Jarvis, iQontrol)",
    "• Create charts showing HRV and heart rate trends over time":
        "• Criar gráficos de tendências de VFC e frequência cardíaca",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• Mostrar fases do sono (REM, profundo, leve) em gráfico circular",
    "• Display daily step count with progress bar towards your goal":
        "• Mostrar passos diários com barra de progresso até ao objetivo",
    Automations: "Automatizações",
    "• Gentle wake-up light when sleep efficiency was low":
        "• Luz de despertar suave quando a eficiência do sono foi baixa",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• Lembrete para deitar mais cedo se a pontuação do sono cair",
    "• Adjust room temperature based on skin temperature trends":
        "• Ajustar a temperatura com base nas tendências da temperatura da pele",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• Resumo matinal via Alexa/Google com o sono da noite",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• Modo relaxe (luzes baixas, música calma) quando a VFC é baixa",
    "• Send push notification when daily step goal is reached":
        "• Notificação push ao atingir o objetivo diário de passos",
    "Notifications & Logging": "Notificações e registo",
    "• Log all health data to InfluxDB for long-term analysis":
        "• Registar todos os dados de saúde no InfluxDB para análise a longo prazo",
    "• Weekly health report via Telegram or email":
        "• Relatório semanal de saúde via Telegram ou e-mail",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• Alerta quando a frequência em repouso está anormalmente alta",
    "• Compare sleep data with weather or calendar events":
        "• Comparar dados de sono com meteorologia ou calendário",
    "About this Adapter": "Sobre este adaptador",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman lê métricas de saúde do seu anel Ultrahuman e disponibiliza-as como objetos ioBroker.",
    "Available data": "Dados disponíveis",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "Sono – Eficiência, duração, fases (REM, profundo, leve), pontuação, ciclos",
    "Heart rate – Resting, night, average, min/max, trend":
        "Frequência cardíaca – Repouso, noite, média, min/máx, tendência",
    "HRV – Average, sleep, min/max, trend": "VFC – Média, sono, min/máx, tendência",
    "SpO2 – If supported by your ring": "SpO2 – Se o anel suportar",
    "Skin temperature": "Temperatura da pele",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "Atividade – Passos, minutos ativos, índice movimento/recuperação, VO2 máx",
    Links: "Ligações",
    "GitHub Repository": "Repositório GitHub",
    "Report an issue": "Reportar problema",
    Author: "Autor",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa – Dicas e inspiração para casa inteligente",
    "License: MIT": "Licença: MIT",
};

export const ru = {
    Authentication: "Аутентификация",
    Settings: "Настройки",
    Ideas: "Идеи",
    About: "О адаптере",
    "Connect your Ultrahuman Ring": "Подключите кольцо Ultrahuman",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "Адаптер считывает данные о здоровье с кольца Ultrahuman через Partner API. Нужны учётные данные API от Ultrahuman.",
    "How to get your credentials": "Как получить учётные данные",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. Отправьте письмо на feedback@ultrahuman.com с запросом доступа к API",
    "2. You will receive an API Key and an Access Code":
        "2. Вы получите ключ API и код доступа",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. Введите код в приложении Ultrahuman (Профиль → Настройки → Partner ID)",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. Введите ключ API и email Ultrahuman ниже",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "Шаблон письма (скопируйте и отправьте на feedback@ultrahuman.com)",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "Выделите текст выше, скопируйте (Ctrl+C / Cmd+C) и вставьте в письмо.",
    "Your credentials": "Ваши учётные данные",
    "API Key": "Ключ API",
    "Paste your API key here": "Вставьте ключ API сюда",
    "The API key you received from Ultrahuman": "Ключ API от Ultrahuman",
    "Ultrahuman Email": "Email Ultrahuman",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "Email, привязанный к аккаунту Ultrahuman. С Apple Privacy Relay заканчивается на @privaterelay.appleid.com. Найдите в приложении: Профиль → Настройки (шестерёнка) → Аккаунт (вверху).",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "Важно: код доступа нужно ввести в приложении: Профиль → Настройки → Partner ID. Без этого API не получит данные.",
    "Support this free adapter – buy me a coffee!": "Поддержите бесплатный адаптер — угостите кофе!",
    "Polling Settings": "Настройки опроса",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "Кольцо периодически синхронизирует данные с облаком (не в реальном времени). Слишком частый опрос тратит ресурсы и может вызвать лимиты.",
    "Polling Interval (minutes)": "Интервал опроса (минуты)",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "Как часто запрашивать данные. Рекомендуется: 30 минут.",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "Рекомендуется: 30 мин | Минимум: 5 мин | Максимум: 1440 мин (24 ч)",
    "Ideas for using your health data": "Идеи использования данных о здоровье",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "Идеи, как использовать данные Ultrahuman в ioBroker:",
    Visualizations: "Визуализация",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• Показать оценку и эффективность сна на панели (VIS, Jarvis, iQontrol)",
    "• Create charts showing HRV and heart rate trends over time":
        "• Графики трендов HRV и пульса",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• Фазы сна (REM, глубокий, лёгкий) круговой диаграммой",
    "• Display daily step count with progress bar towards your goal":
        "• Дневные шаги с полосой прогресса к цели",
    Automations: "Автоматизация",
    "• Gentle wake-up light when sleep efficiency was low":
        "• Мягкий свет при низкой эффективности сна",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• Напоминание лечь раньше, если оценка сна ниже порога",
    "• Adjust room temperature based on skin temperature trends":
        "• Регулировка температуры по трендам температуры кожи",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• Утренний брифинг через Alexa/Google с итогом сна",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• Режим релаксации при низком HRV",
    "• Send push notification when daily step goal is reached":
        "• Push при достижении дневной цели по шагам",
    "Notifications & Logging": "Уведомления и журнал",
    "• Log all health data to InfluxDB for long-term analysis":
        "• Запись всех данных в InfluxDB для долгосрочного анализа",
    "• Weekly health report via Telegram or email":
        "• Еженедельный отчёт через Telegram или email",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• Предупреждение при необычно высоком пульсе в покое",
    "• Compare sleep data with weather or calendar events":
        "• Сравнение сна с погодой или календарём",
    "About this Adapter": "Об этом адаптере",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman считывает показатели здоровья с кольца Ultrahuman и предоставляет их как объекты ioBroker.",
    "Available data": "Доступные данные",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "Сон — эффективность, длительность, фазы (REM, глубокий, лёгкий), оценка, циклы",
    "Heart rate – Resting, night, average, min/max, trend":
        "Пульс — покой, ночь, средний, мин/макс, тренд",
    "HRV – Average, sleep, min/max, trend": "HRV — средний, сон, мин/макс, тренд",
    "SpO2 – If supported by your ring": "SpO2 — если поддерживается кольцом",
    "Skin temperature": "Температура кожи",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "Активность — шаги, активные минуты, индекс движения/восстановления, VO2 max",
    Links: "Ссылки",
    "GitHub Repository": "Репозиторий GitHub",
    "Report an issue": "Сообщить о проблеме",
    Author: "Автор",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa — советы и идеи для умного дома",
    "License: MIT": "Лиценция: MIT",
};

export const uk = {
    Authentication: "Автентифікація",
    Settings: "Налаштування",
    Ideas: "Ідеї",
    About: "Про адаптер",
    "Connect your Ultrahuman Ring": "Підключіть кільце Ultrahuman",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "Адаптер зчитує дані про здоров'я з кільця Ultrahuman через Partner API. Потрібні облікові дані API від Ultrahuman.",
    "How to get your credentials": "Як отримати облікові дані",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. Надішліть лист на feedback@ultrahuman.com із запитом доступу до API",
    "2. You will receive an API Key and an Access Code":
        "2. Ви отримаєте ключ API і код доступу",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. Введіть код у застосунку Ultrahuman (Профіль → Налаштування → Partner ID)",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. Введіть ключ API та email Ultrahuman нижче",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "Шаблон листа (скопіюйте та надішліть на feedback@ultrahuman.com)",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "Виділіть текст вище, скопіюйте (Ctrl+C / Cmd+C) і вставте в лист.",
    "Your credentials": "Ваші облікові дані",
    "API Key": "Ключ API",
    "Paste your API key here": "Вставте ключ API сюди",
    "The API key you received from Ultrahuman": "Ключ API від Ultrahuman",
    "Ultrahuman Email": "Email Ultrahuman",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "Email, прив'язаний до облікового запису Ultrahuman. З Apple Privacy Relay закінчується на @privaterelay.appleid.com. Знайдіть у застосунку: Профіль → Налаштування (шестерня) → Обліковий запис (зверху).",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "Важливо: код доступу потрібно ввести в застосунку: Профіль → Налаштування → Partner ID. Без цього API не отримає дані.",
    "Support this free adapter – buy me a coffee!": "Підтримайте безкоштовний адаптер — пригостіть кавою!",
    "Polling Settings": "Налаштування опитування",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "Кільце періодично синхронізує дані з хмарою (не в реальному часі). Занадто часте опитування марнує ресурси і може спричинити ліміти.",
    "Polling Interval (minutes)": "Інтервал опитування (хвилини)",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "Як часто отримувати дані з API. Рекомендовано: 30 хвилин.",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "Рекомендовано: 30 хв | Мінімум: 5 хв | Максимум: 1440 хв (24 год)",
    "Ideas for using your health data": "Ідеї використання даних про здоров'я",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "Ідеї, як використовувати дані Ultrahuman в ioBroker:",
    Visualizations: "Візуалізація",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• Показати оцінку та ефективність сну на панелі (VIS, Jarvis, iQontrol)",
    "• Create charts showing HRV and heart rate trends over time":
        "• Графіки трендів HRV та пульсу",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• Фази сну (REM, глибокий, легкий) круговою діаграмою",
    "• Display daily step count with progress bar towards your goal":
        "• Щоденні кроки з смугою прогресу до мети",
    Automations: "Автоматизація",
    "• Gentle wake-up light when sleep efficiency was low":
        "• М'яке світло пробудження при низькій ефективності сну",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• Нагадування лягти раніше, якщо оцінка сну нижче порогу",
    "• Adjust room temperature based on skin temperature trends":
        "• Регулювання температури за трендами температури шкіри",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• Ранковий брифінг через Alexa/Google з підсумком сну",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• Режим релаксації при низькому HRV",
    "• Send push notification when daily step goal is reached":
        "• Push при досягненні денної мети кроків",
    "Notifications & Logging": "Сповіщення та журнал",
    "• Log all health data to InfluxDB for long-term analysis":
        "• Запис усіх даних у InfluxDB для довгострокового аналізу",
    "• Weekly health report via Telegram or email":
        "• Щотижневий звіт через Telegram або email",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• Попередження при незвично високому пульсі в спокої",
    "• Compare sleep data with weather or calendar events":
        "• Порівняння сну з погодою або календарем",
    "About this Adapter": "Про цей адаптер",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman зчитує показники здоров'я з кільця Ultrahuman і надає їх як об'єкти ioBroker.",
    "Available data": "Доступні дані",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "Сон — ефективність, тривалість, фази (REM, глибокий, легкий), оцінка, цикли",
    "Heart rate – Resting, night, average, min/max, trend":
        "Пульс — спокій, ніч, середній, мін/макс, тренд",
    "HRV – Average, sleep, min/max, trend": "HRV — середній, сон, мін/макс, тренд",
    "SpO2 – If supported by your ring": "SpO2 — якщо підтримує кільце",
    "Skin temperature": "Температура шкіри",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "Активність — кроки, активні хвилини, індекс руху/відновлення, VO2 max",
    Links: "Посилання",
    "GitHub Repository": "Репозиторій GitHub",
    "Report an issue": "Повідомити про проблему",
    Author: "Автор",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa — поради та натхнення для розумного дому",
    "License: MIT": "Ліцензія: MIT",
};

export const zhCn = {
    Authentication: "身份验证",
    Settings: "设置",
    Ideas: "使用灵感",
    About: "关于",
    "Connect your Ultrahuman Ring": "连接 Ultrahuman 智能戒指",
    "This adapter reads health data from your Ultrahuman Ring via the Partner API. You need API credentials directly from Ultrahuman.":
        "本适配器通过合作伙伴 API 从 Ultrahuman 戒指读取健康数据。需要向 Ultrahuman 申请 API 凭据。",
    "How to get your credentials": "如何获取凭据",
    "1. Send an email to feedback@ultrahuman.com requesting API access":
        "1. 发送邮件至 feedback@ultrahuman.com 申请 API 访问",
    "2. You will receive an API Key and an Access Code":
        "2. 您将收到 API 密钥和访问码",
    "3. Enter the Access Code in your Ultrahuman app (Profile → Settings → Partner ID)":
        "3. 在 Ultrahuman 应用中输入访问码（个人资料 → 设置 → Partner ID）",
    "4. Enter the API Key and your Ultrahuman email below":
        "4. 在下方填写 API 密钥和 Ultrahuman 邮箱",
    "Email template (copy and send to feedback@ultrahuman.com)":
        "邮件模板（复制并发送至 feedback@ultrahuman.com）",
    "Select the text above, copy it (Ctrl+C / Cmd+C) and paste it into your email.":
        "选中上方文本，复制（Ctrl+C / Cmd+C）后粘贴到邮件中。",
    "Your credentials": "您的凭据",
    "API Key": "API 密钥",
    "Paste your API key here": "在此粘贴 API 密钥",
    "The API key you received from Ultrahuman": "由 Ultrahuman 提供的 API 密钥",
    "Ultrahuman Email": "Ultrahuman 邮箱",
    "The email address linked to your Ultrahuman account. If you signed up with Apple Privacy Relay, the address ends with @privaterelay.appleid.com. You can find it in the app under Profile → Settings (gear icon) → Account (at the top).":
        "与 Ultrahuman 账户绑定的邮箱。若使用 Apple 隐私中继，地址以 @privaterelay.appleid.com 结尾。可在应用中：个人资料 → 设置（齿轮）→ 账户（顶部）查看。",
    "Important: The Access Code must be entered in your Ultrahuman app under Profile → Settings → Partner ID. Without this, the API cannot access your data.":
        "重要：必须在应用中于「个人资料 → 设置 → Partner ID」填写访问码，否则 API 无法访问您的数据。",
    "Support this free adapter – buy me a coffee!": "支持本免费适配器 — 请我喝杯咖啡！",
    "Polling Settings": "轮询设置",
    "The Ultrahuman Ring syncs data periodically to the cloud (not in real-time). Polling too frequently wastes resources and may trigger rate limits.":
        "戒指会定期同步数据到云端（非实时）。过于频繁的轮询会浪费资源并可能触发速率限制。",
    "Polling Interval (minutes)": "轮询间隔（分钟）",
    "How often to fetch new data from the API. Recommended: 30 minutes.":
        "从 API 获取新数据的频率。建议：30 分钟。",
    "Recommended: 30 min | Minimum: 5 min | Maximum: 1440 min (24h)":
        "建议：30 分钟 | 最少：5 分钟 | 最多：1440 分钟（24 小时）",
    "Ideas for using your health data": "健康数据使用灵感",
    "Here are some ideas for what you can do with your Ultrahuman data in ioBroker:":
        "以下是在 ioBroker 中使用 Ultrahuman 数据的一些想法：",
    Visualizations: "可视化",
    "• Display sleep score and efficiency on a dashboard (VIS, Jarvis, iQontrol)":
        "• 在仪表板显示睡眠评分与效率（VIS、Jarvis、iQontrol）",
    "• Create charts showing HRV and heart rate trends over time":
        "• 绘制 HRV 与心率趋势图",
    "• Show sleep stages (REM, deep, light) as a pie chart":
        "• 以饼图展示睡眠阶段（REM、深睡、浅睡）",
    "• Display daily step count with progress bar towards your goal":
        "• 显示每日步数及目标进度条",
    Automations: "自动化",
    "• Gentle wake-up light when sleep efficiency was low":
        "• 睡眠效率低时使用柔和唤醒灯",
    "• Reminder to go to bed earlier if sleep score drops below threshold":
        "• 睡眠评分低于阈值时提醒早睡",
    "• Adjust room temperature based on skin temperature trends":
        "• 根据皮肤温度趋势调节室温",
    "• Morning briefing via Alexa/Google with last night's sleep summary":
        "• 通过 Alexa/Google 播报昨夜睡眠摘要",
    "• Activate relaxation mode (dim lights, calm music) when HRV is low":
        "• HRV 偏低时开启放松模式（调暗灯光、舒缓音乐）",
    "• Send push notification when daily step goal is reached":
        "• 达成每日步数目标时推送通知",
    "Notifications & Logging": "通知与记录",
    "• Log all health data to InfluxDB for long-term analysis":
        "• 将所有健康数据写入 InfluxDB 做长期分析",
    "• Weekly health report via Telegram or email":
        "• 通过 Telegram 或邮件发送每周健康报告",
    "• Alert when resting heart rate is unusually high (possible illness)":
        "• 静息心率异常升高时告警（可能生病）",
    "• Compare sleep data with weather or calendar events":
        "• 将睡眠数据与天气或日历事件对比",
    "About this Adapter": "关于本适配器",
    "ioBroker.ultrahuman reads health metrics from your Ultrahuman Ring and makes them available as ioBroker objects.":
        "ioBroker.ultrahuman 从 Ultrahuman 戒指读取健康指标并作为 ioBroker 对象提供。",
    "Available data": "可用数据",
    "Sleep – Efficiency, duration, stages (REM, deep, light), score, cycles":
        "睡眠 — 效率、时长、阶段（REM、深睡、浅睡）、评分、周期",
    "Heart rate – Resting, night, average, min/max, trend":
        "心率 — 静息、夜间、平均、最小/最大、趋势",
    "HRV – Average, sleep, min/max, trend": "HRV — 平均、睡眠、最小/最大、趋势",
    "SpO2 – If supported by your ring": "血氧 SpO2 — 若戒指支持",
    "Skin temperature": "皮肤温度",
    "Activity – Steps, active minutes, movement/recovery index, VO2 max":
        "活动 — 步数、活跃分钟、运动/恢复指数、最大摄氧量",
    Links: "链接",
    "GitHub Repository": "GitHub 仓库",
    "Report an issue": "报告问题",
    Author: "作者",
    "SmarterPapa – Smart Home Tips & Inspirations":
        "SmarterPapa — 智能家居技巧与灵感",
    "License: MIT": "许可证：MIT",
};
