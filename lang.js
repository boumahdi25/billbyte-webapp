<script>
  // 1. Ajoutez 'de' et 'zh' aux langues supportées
  const supportedLangs = ['en', 'fr', 'ar', 'es', 'de', 'zh'];

  async function setLang(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) throw new Error(`Fichier de langue non trouvé: ${lang}.json`);
      
      const translations = await response.json();

      // 2. Appliquez les traductions
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
          // Gestion RTL pour l'arabe
          if (lang === 'ar') el.dir = "rtl";
          else el.removeAttribute("dir");
        }
      });

      // 3. Mettez à jour le sélecteur de langue (optionnel)
      const langBtn = document.getElementById('langBtn');
      if (langBtn) {
        const langNames = {
          en: 'English', fr: 'Français', ar: 'العربية', 
          es: 'Español', de: 'Deutsch', zh: '中文'
        };
        langBtn.innerHTML = `<i>🌐</i> ${langNames[lang] || lang}`;
      }

      console.log(`Langue chargée: ${lang}`); // Debug
    } catch (error) {
      console.error("Erreur de chargement de la langue:", error);
      // Recharger en anglais par défaut en cas d'échec
      if (lang !== 'en') setLang('en');
    }
  }

  // 4. Détection automatique améliorée
  const userLang = navigator.language.slice(0, 2);
  const lang = supportedLangs.includes(userLang) ? userLang : 'en';
  
  // 5. Initialisation au chargement + écouteur pour le sélecteur
  window.addEventListener("DOMContentLoaded", () => {
    // Applique la langue par défaut
    setLang(lang);
    
    // Gère le changement de langue via le sélecteur
    document.getElementById('langSelect')?.addEventListener('change', (e) => {
      setLang(e.target.value);
    });
  });
</script>