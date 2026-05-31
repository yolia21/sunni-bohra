document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // NAVIGATION ACTIONS
  // ==========================================================================
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksList = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  mobileMenuBtn.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
  });

  // Smooth scroll links and collapse mobile menu
  document.querySelectorAll('.nav-links a, .btn-secondary, .btn-primary').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          navLinksList.classList.remove('active');
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ==========================================================================
  // TIMELINE DETAILS TOGGLE
  // ==========================================================================
  const timelineContents = document.querySelectorAll('.timeline-content');
  
  timelineContents.forEach(content => {
    content.addEventListener('click', (e) => {
      // Don't toggle if clicking on links or buttons inside
      if (e.target.tagName === 'A') return;
      
      const isActive = content.classList.contains('active');
      
      // Close other open items
      timelineContents.forEach(item => item.classList.remove('active'));
      
      if (!isActive) {
        content.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // SUBGROUP SWITCHER
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Set active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Set active content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });

  // ==========================================================================
  // DIASPORA MAP INTERACTIVITY
  // ==========================================================================
  const mapMarkers = document.querySelectorAll('.map-marker');
  const diasporaPrompt = document.getElementById('diaspora-prompt');
  const diasporaContent = document.getElementById('diaspora-content');
  
  const countryNameEl = document.getElementById('diaspora-country-name');
  const regionNameEl = document.getElementById('diaspora-region-title');
  const statEl = document.getElementById('diaspora-stat-value');
  const descEl = document.getElementById('diaspora-desc');

  // Country metrics database
  const diasporaData = {
    india: {
      country: 'ANDESTAL HOME',
      region: 'Gujarat, India',
      stat: '500,000+',
      desc: 'The historical heartland of the Sunni Bohras, spanning the districts of Surat, Bharuch, Patan, and Anand. The community remains highly structured through localized Jamat Bandis, administering historic mosques, charitable hospitals, and leading Islamic schools like Darul Uloom Falah-e-Darain in Tadkeshwar. While many are modern professionals and traders, traditional cotton farming and local commerce still define ancestral villages.'
    },
    southafrica: {
      country: 'PASSENGER TRADERS',
      region: 'South Africa',
      stat: '50,000+',
      desc: 'Arriving in the late 19th and early 20th centuries as free "passenger Indians," Surti Sunni Bohras established prominent trading networks in the Transvaal (Johannesburg, Pretoria) and Natal (Durban). Known for their entrepreneurship, they built the historic Grey Street Mosque (Juma Masjid) in Durban and played a crucial role in forming South Africa\'s Muslim community infrastructure while navigating Apartheid restrictions.'
    },
    uk: {
      country: 'DIASPORA HUB',
      region: 'United Kingdom',
      stat: '45,000+',
      desc: 'Significant migration began in the 1960s, primarily drawing Bharuchi and Surti families from rural Gujarat. Concentrated in industrial hubs like Blackburn, Preston, Leicester, Bolton, and London, they established robust local Jamats, constructed majestic mosques, and successfully preserved their cultural values, traditional foods, and Gujarati linguistic dialects across generations.'
    },
    canada: {
      country: 'NORTH AMERICA',
      region: 'Canada',
      stat: '25,000+',
      desc: 'A thriving community settled in Toronto, Vancouver, Calgary, and Montreal. Combining business acumen with a high rate of academic and professional achievement, Canadian Sunni Bohras actively lead philanthropic societies that support educational institutions back in their ancestral villages in Gujarat.'
    },
    pakistan: {
      country: 'POST-PARTITION MERCHANTS',
      region: 'Pakistan',
      stat: '100,000+',
      desc: 'Following the 1947 Partition, a large portion of Patani/Jafari Bohras, alongside Surti traders, migrated to Karachi and Sindh. Establishing the Sunni Bohra Jamat Karachi, they entered sectors like textile manufacturing, wholesale trade, and chemicals, forming a highly influential mercantile class in the commercial capital of Pakistan.'
    }
  };

  function updateDiasporaPanel(key) {
    const data = diasporaData[key];
    if (!data) return;

    // Fade out panel
    diasporaContent.classList.remove('active');
    diasporaPrompt.style.display = 'none';

    setTimeout(() => {
      // Set text
      countryNameEl.textContent = data.country;
      regionNameEl.textContent = data.region;
      statEl.innerHTML = `${data.stat} <span>Estimated Population & Descendants</span>`;
      descEl.textContent = data.desc;

      // Fade in panel
      diasporaContent.classList.add('active');
    }, 200);
  }

  mapMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
      const countryKey = this.getAttribute('data-country');
      updateDiasporaPanel(countryKey);
      
      // Highlight selected marker
      mapMarkers.forEach(m => {
        const circle = m.querySelector('circle');
        circle.style.fill = '';
        circle.style.r = '';
      });
      const thisCircle = this.querySelector('circle');
      thisCircle.style.fill = 'var(--gold-glow)';
      thisCircle.style.r = '10px';
    });
  });

  // Trigger click on India automatically on load
  const indiaMarker = document.querySelector('[data-country="india"]');
  if (indiaMarker) {
    indiaMarker.dispatchEvent(new Event('click'));
  }

  // ==========================================================================
  // DISCOVERY QUIZ LOGIC
  // ==========================================================================
  const quizData = [
    {
      question: "What is the primary theological school of jurisprudence followed by the Sunni Bohra community?",
      options: ["Hanafi School", "Shafi'i School", "Maliki School", "Ja'fari Shia Jurisprudence"],
      answer: 0,
      explanation: "Sunni Bohras adhere to the Hanafi school of Sunni Islamic jurisprudence, separating them from the Shia Ismaili Dawoodi Bohras."
    },
    {
      question: "Which 15th-century leader was pivotal in the transition of a section of Bohras to Sunni Islam in Patan?",
      options: ["Maulana Syed Jafar Ahmad Shirazi", "Jafar Patani (Ja'far Patni)", "Sultan Muzaffar Shah I", "Syedna Qutbuddin"],
      answer: 1,
      explanation: "Jafar Patani led the missionary effort in Patan that convinced many Ismaili Bohras to transition to Sunni Islam, hence they are also historically known as Jafari Bohras."
    },
    {
      question: "Which subgroup of Sunni Bohras is historically settled north of the Narmada River and frequently uses the surname 'Patel'?",
      options: ["Surti Sunni Bohras", "Charotar Vohras", "Bharuchi Sunni Bohras", "Kadiwal Bohras"],
      answer: 2,
      explanation: "Bharuchi Sunni Bohras, living north of the Narmada, have deep roots in cotton cultivation and agricultural trade, and traditionally carry the 'Patel' surname."
    },
    {
      question: "The name 'Bohra' (or Vohra) originates from the Gujarati word 'vohorvu'. What does this word mean?",
      options: ["To farm or harvest", "To build shelters", "To travel by sea", "To trade or sell merchandise"],
      answer: 3,
      explanation: "The name comes from the Gujarati verb 'vohorvu', meaning 'to trade', which historically represents their identity as a prominent mercantile community."
    },
    {
      question: "Sunni Bohras from Surat who migrated as passenger merchants to South Africa are culturally referred to as what?",
      options: ["Patnis", "Surtis", "Memons", "Kanamias"],
      answer: 1,
      explanation: "In South Africa, Sunni Bohras originating from the Surat district are famously known as 'Surtis', distinguishing them from other merchant groups like the Memons."
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let hasAnswered = false;

  const progressEl = document.getElementById('quiz-q-progress');
  const scoreTrackerEl = document.getElementById('quiz-score-val');
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options-container');
  const feedbackEl = document.getElementById('quiz-feedback');
  const actionBtn = document.getElementById('quiz-next-btn');
  
  const quizScreen = document.getElementById('quiz-active-screen');
  const resultsScreen = document.getElementById('quiz-results');
  const finalScoreEl = document.getElementById('quiz-final-score-val');
  const remarksEl = document.getElementById('quiz-remarks-text');
  const restartBtn = document.getElementById('quiz-restart-btn');

  function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;
    
    quizScreen.style.display = 'block';
    resultsScreen.classList.remove('active');
    resultsScreen.style.display = 'none';
    
    loadQuestion();
  }

  function loadQuestion() {
    hasAnswered = false;
    feedbackEl.classList.remove('active', 'correct-box', 'incorrect-box');
    feedbackEl.style.display = 'none';
    actionBtn.style.display = 'none';
    actionBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "Finish Quiz" : "Next Question";

    const currentQ = quizData[currentQuestionIndex];
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    scoreTrackerEl.textContent = score;
    questionEl.textContent = currentQ.question;

    optionsEl.innerHTML = '';
    currentQ.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option;
      btn.addEventListener('click', () => selectOption(index, btn));
      optionsEl.appendChild(btn);
    });
  }

  function selectOption(selectedIndex, selectedBtn) {
    if (hasAnswered) return;
    hasAnswered = true;

    const currentQ = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.answer;

    // Update option classes
    const optionBtns = optionsEl.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
      if (index === currentQ.answer) {
        btn.classList.add('correct');
      } else if (index === selectedIndex) {
        btn.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      score++;
      scoreTrackerEl.textContent = score;
      feedbackEl.textContent = "Correct! " + currentQ.explanation;
      feedbackEl.className = "quiz-feedback-box active correct-box";
      feedbackEl.style.display = 'block';
    } else {
      feedbackEl.textContent = "Incorrect. " + currentQ.explanation;
      feedbackEl.className = "quiz-feedback-box active incorrect-box";
      feedbackEl.style.display = 'block';
    }

    actionBtn.style.display = 'block';
  }

  actionBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResults();
    }
  });

  function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';
    
    // Add active class after a tiny delay for CSS transition
    setTimeout(() => {
      resultsScreen.classList.add('active');
    }, 50);

    finalScoreEl.textContent = `${score} / ${quizData.length}`;

    let remarks = "";
    if (score === quizData.length) {
      remarks = "Excellent! You are a master of Sunni Bohra history and heritage. You've fully explored their architectural, theological, and geographic legacies.";
    } else if (score >= 3) {
      remarks = "Well done! You have a strong grasp of the Sunni Bohra community's roots, their mercantile migration, and their distinctive culture.";
    } else {
      remarks = "A good start! Review the website sections above to discover more about the historical schisms, regional subgroups, and mercantile networks.";
    }
    remarksEl.textContent = remarks;
  }

  restartBtn.addEventListener('click', initQuiz);

  // Start the quiz
  initQuiz();
});
