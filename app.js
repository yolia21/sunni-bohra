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

  // ==========================================================================
  // LUMINARY MODAL & BIOGRAPHY DATABASE
  // ==========================================================================
  const biographyData = {
    'abdul-ghafur': {
      name: 'Mulla Abdul Ghafur',
      tag: 'Commerce & Shipping',
      era: '17th – 18th Century &bull; Surat',
      img: '',
      bio: `
        <p><strong>Mulla Abdul Ghafur</strong> was a legendary merchant prince of Surat in Mughal India. In the late 17th and early 18th centuries, he rose to become one of the wealthiest mercantile magnates in the world, with a personal trading fortune and shipping fleet that rivaled contemporary European trading corporations like the English and Dutch East India Companies.</p>
        <p>Operating during the reign of Mughal Emperor Aurangzeb, Abdul Ghafur owned more than 17 major ocean-going merchant vessels. His ships plied the highly lucrative trade routes between Surat, the Persian Gulf, the Red Sea, and the East African ports, exchanging Gujarati textiles, spices, indigo, and agricultural goods for bullion and coffee.</p>
        <div class="modal-bio-section-title">Rise to Influence</div>
        <p>Ghafur hailed from the Sunni Bohra (Vohra) mercantile community of South Gujarat. Under his leadership, the port city of Surat became a global trade powerhouse. He leveraged his vast wealth to establish political independence, often negotiating directly with Mughal officials, local governors, and European traders on equal terms. His sheer volume of trade allowed him to influence local markets, control commodity pricing, and finance smaller Gujarati merchants.</p>
        <div class="modal-bio-section-title">Defying European Monopolies</div>
        <p>When European pirates and privateers harassed Indian vessels in the Arabian Sea, Abdul Ghafur led coalitions of native merchants to demand protection from the Mughal administration. He pressured the Mughal authorities to force the English, French, and Dutch companies to sign convoy security pacts, safeguarding Indian ships from piracy and European aggression.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Constructed a personal fleet of over 17 large-capacity merchant ships.</li>
            <li>Amassed a legendary fortune estimated in millions of rupees (billions in modern terms).</li>
            <li>Led resistance against European naval blockades, protecting Gujarati maritime autonomy.</li>
            <li>Established Surat as the leading mercantile port of the Mughal Empire.</li>
          </ul>
        </div>
      `
    },
    'kathrada': {
      name: 'Ahmed Kathrada',
      tag: 'Political Activism',
      era: '1929 – 2017 &bull; South Africa',
      img: 'kathrada.jpg',
      bio: `
        <p><strong>Ahmed Mohamed Kathrada</strong> (affectionately known as "Kathy") was an iconic South African anti-apartheid politician, activist, and political prisoner. His lifelong struggle against racial segregation and white minority rule cemented his legacy as a father of modern democratic South Africa.</p>
        <p>Kathrada's roots trace back to the Surti Sunni Bohra community of South Gujarat. His parents migrated from the village of Tadkeshwar in Gujarat to Schweizer-Reneke, a small town in the Transvaal province of South Africa, where Ahmed was born in 1929.</p>
        <div class="modal-bio-section-title">The Rivonia Trial & Robben Island</div>
        <p>From the early age of 12, Kathrada dedicated his life to political activism. He rose through the ranks of the Transvaal Indian Congress and the African National Congress (ANC), coordinating multi-racial resistance alongside Nelson Mandela, Walter Sisulu, and Joe Slovo. In 1963, he was arrested at Liliesleaf Farm during a police raid and put on trial for sabotage and attempting to overthrow the government in the historic Rivonia Trial.</p>
        <p>Sentenced to life imprisonment with hard labor, he spent 26 years and 3 months behind bars, with 18 of those years served on the notorious Robben Island. While imprisoned, he completed four university degrees in history, politics, bibliography, and African literature, proving to be an intellectual anchor for his fellow political prisoners.</p>
        <div class="modal-bio-section-title">Democratic Leadership</div>
        <p>Following his release in October 1989, Kathrada was elected to South Africa's first democratic parliament in 1994. He served as the Parliamentary Counsellor to President Nelson Mandela and was appointed chairperson of the Robben Island Museum Council. In 2008, he launched the Ahmed Kathrada Foundation to combat racism and promote non-racial human rights.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Co-organized the 1952 Defiance Campaign against unjust apartheid laws.</li>
            <li>Rivonia Trialist sentenced to life imprisonment alongside Nelson Mandela.</li>
            <li>Served as Parliamentary Counsellor to South Africa's first democratic president.</li>
            <li>Awarded the 'Isitwalandwe/Seaparankoe'—the ANC's highest honor for service.</li>
          </ul>
        </div>
      `
    },
    'issa-brothers': {
      name: 'Mohsin & Zuber Issa',
      tag: 'Global Enterprise',
      era: 'Contemporary &bull; United Kingdom',
      img: 'issa_brothers.jpg',
      bio: `
        <p><strong>Mohsin and Zuber Issa</strong> are prominent British self-made billionaire entrepreneurs who revolutionized the global convenience retail and fuel sector. Born to Gujarati Sunni Bohra parents who migrated from Bharuch, Gujarat, to Blackburn, England in the 1960s, the brothers built a global empire from humble beginnings.</p>
        <p>In 2001, they acquired a single derelict petrol station in Bury, Greater Manchester, for £150,000. Through innovative commercial branding, focusing on premium food-to-go options, and partnering with major brand franchises, they grew their venture into the multi-national EG Group.</p>
        <div class="modal-bio-section-title">Creating the EG Group</div>
        <p>The Issa brothers pioneered a new model for service stations, transforming them from simple fuel stops into convenience retail hubs. By partnering with leading brands like Starbucks, Subway, Burger King, and Greggs, they maximized customer footfall and retail margins. Today, the EG Group operates over 6,600 locations across the United Kingdom, Europe, the United States, and Australia, employing over 50,000 people.</p>
        <div class="modal-bio-section-title">Acquisition of ASDA</div>
        <p>In 2020, in partnership with private equity firm TDR Capital, the Issa brothers made headlines globally by acquiring a majority stake in ASDA, one of the UK's "Big Four" supermarket chains, from Walmart in a landmark transaction valued at £6.8 billion. This acquisition represented the return of ASDA to British ownership for the first time in 21 years and positioned the brothers at the absolute peak of British retail enterprise.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Built the EG Group from a single station to a global 6,600+ location empire.</li>
            <li>Acquired British supermarket giant ASDA in a historic £6.8B transaction.</li>
            <li>Recognized as Officers of the Order of the British Empire (OBE) in 2020.</li>
            <li>Pioneered modern convenience retail integration within fuel stations.</li>
          </ul>
        </div>
      `
    },
    'mufti-menk': {
      name: 'Mufti Ismail Menk',
      tag: 'Islamic Scholarship',
      era: 'Contemporary &bull; Zimbabwe',
      img: 'mufti_menk.jpg',
      bio: `
        <p><strong>Ismail ibn Musa Menk</strong> (commonly known as Mufti Menk) is a world-renowned Islamic scholar, motivational speaker, and the Grand Mufti of Zimbabwe. With his engaging speaking style, relatable advice, and message of universal peace, he has emerged as one of the most influential Muslim voices globally.</p>
        <p>Mufti Menk belongs to the Gujarati Sunni Vohra diaspora. His family lineage is rooted in the Surat district of Gujarat, India, from where his father migrated to Zimbabwe, establishing community institutions and religious education programs.</p>
        <div class="modal-bio-section-title">Education and Training</div>
        <p>He completed his initial schooling and memorized the Quran under the guidance of his father, Maulana Musa Menk. He then pursued higher studies in Sharia (Islamic Law) at the Islamic University of Madinah in Saudi Arabia. Following this, he specialized in Hanafi jurisprudence (Ifta) at the Darul Uloom Kantharia seminary in Gujarat, India, connecting him directly with the traditional intellectual heritage of his ancestors.</p>
        <div class="modal-bio-section-title">Global Impact and Outreach</div>
        <p>As the head of the Fatwa Department for the Council of Islamic Scholars of Zimbabwe (Majlisul Ulama Zimbabwe), Mufti Menk manages local religious administration. However, his primary impact is global: utilizing social media, YouTube, and podcasts, he reaches tens of millions of viewers worldwide. He was named one of the 500 Most Influential Muslims in the world every year since 2010 by the Royal Islamic Strategic Studies Centre.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Appointed Grand Mufti of Zimbabwe and Head of the Majlisul Ulama Fatwa Department.</li>
            <li>Recipient of the Global Leadership Award in Social Guidance (2015).</li>
            <li>Reaches over 20 million followers across digital platforms.</li>
            <li>Prominent global advocate for interfaith harmony, peace, and anti-extremism.</li>
          </ul>
        </div>
      `
    },
    'sir-alimuddin': {
      name: 'Prof. Sir Alimuddin Zumla',
      tag: 'Medicine & Science',
      era: 'Contemporary &bull; UK / Zambia',
      img: 'sir_alimuddin.jpg',
      bio: `
        <p><strong>Professor Sir Alimuddin Zumla</strong> is an internationally acclaimed professor of infectious diseases and international health at University College London (UCL) and a consultant physician at UCL Hospitals NHS Foundation Trust. His pioneering research in tuberculosis (TB), HIV, and respiratory infections has saved countless lives globally.</p>
        <p>Sir Alimuddin's family roots are in South Gujarat's Sunni Bohra community. His lineage connects directly with the early waves of Gujarati merchants who migrated to East and Central Africa in search of trade and educational opportunities.</p>
        <div class="modal-bio-section-title">Scientific Achievements</div>
        <p>Professor Zumla is globally recognized for his work in clinical trial research, epidemiology, and diagnostics. He has published over 650 peer-reviewed scientific articles and edited 22 medical textbooks. His research has shaped international guidelines for treating coinfections of HIV and Tuberculosis, particularly in Sub-Saharan Africa and Asia.</p>
        <div class="modal-bio-section-title">Knighthood and Global Awards</div>
        <p>In the 2017 New Year Honours, he was knighted by Queen Elizabeth II for services to global health and infectious diseases. He has also received numerous awards, including the Royal Society of Tropical Medicine and Hygiene's Chalmers Memorial Medal, the World Health Organization's Stop TB Partnership Award, and the Grand Commander of the Order of the Distinguished Services (Zambia's highest civil honor).</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Knighted by Queen Elizabeth II in 2017 for services to Global Health.</li>
            <li>Published over 650 research articles and edited 22 major medical textbooks.</li>
            <li>Recipient of the WHO Stop TB Partnership Koch Landouzy Award.</li>
            <li>Pioneered dual HIV-TB drug combination trials saving millions of lives.</li>
          </ul>
        </div>
      `
    },
    'vastanvi': {
      name: 'Maulana Ghulam Vastanvi',
      tag: 'Modern Education',
      era: 'Contemporary &bull; India',
      img: 'ghulam_vastanvi.jpg',
      bio: `
        <p><strong>Maulana Ghulam Mohammad Vastanvi</strong> is a prominent Indian Islamic scholar, progressive educationist, and social reformer. He is famous for establishing the Jamia Islamia Ishaatul Uloom educational network in Akkalkuwa, Maharashtra, which pioneered a revolutionary integration of traditional seminary learning with modern science and professional degrees.</p>
        <p>He is a notable figure within the Charotar and Surti Sunni Vohra intellectual circles, representing the community's traditional dedication to community welfare, institutional charity, and progressive development.</p>
        <div class="modal-bio-section-title">The Akkalkuwa Educational Revolution</div>
        <p>In 1979, Ghulam Vastanvi founded a small school in Akkalkuwa, a remote, tribal-dominated village in Maharashtra. Recognizing that religious education alone could limit students' livelihood options, he introduced a curriculum combining Quranic studies with computer science, mathematics, and English. Over the decades, this grew into a massive network hosting over 200,000 students across multiple campuses.</p>
        <p>Today, the Jamia network includes government-recognized engineering colleges, medical colleges, pharmacy institutes, and nursing academies, allowing students from poor and minority backgrounds to qualify as doctors, software engineers, and pharmacists while retaining their cultural roots.</p>
        <div class="modal-bio-section-title">Social Reform & Leadership</div>
        <p>Vastanvi briefly served as the rector of the Darul Uloom Deoband in 2011, where he advocated for expanding the curriculum of traditional madrasas to include technical training. His work continues to inspire educators across South Asia, demonstrating how traditional communities can adapt to the modern global economy.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Founded the Jamia Islamia Ishaatul Uloom network educating over 200,000 students.</li>
            <li>Established India's first modern medical and engineering colleges run by a traditional seminary.</li>
            <li>Pioneered reform of madrasa curricula, integrating IT, science, and medicine.</li>
            <li>Recipient of multiple educational and humanitarian awards across India.</li>
          </ul>
        </div>
      `
    },
    'hafiz-patel': {
      name: 'Hafiz Patel',
      tag: 'Islamic Scholarship',
      era: '1926 – 2016 &bull; United Kingdom',
      img: 'hafiz_patel.jpg',
      bio: `
        <p><strong>Hafiz Patel</strong> (born Habib Patel) was one of the most influential and respected British Muslim religious leaders of the 20th century. He was a pioneer in establishing the Tablighi Jamaat movement in the United Kingdom and across Europe, transforming Dewsbury and Blackburn into major global centers of spiritual guidance and education.</p>
        <p>Born in the Surat district of Gujarat, India, Hafiz Patel migrated to the UK in the early 1960s, joining the early waves of South Asian Muslim textile and factory workers who settled in the industrial towns of Yorkshire and Lancashire.</p>
        <div class="modal-bio-section-title">Founding the Dewsbury Markaz</div>
        <p>Recognizing the spiritual and cultural challenges faced by the newly arrived migrant communities, Hafiz Patel dedicated his life to community organizing and religious education. In Dewsbury, West Yorkshire, he spearheaded the construction of the massive Markazi Mosque (Dewsbury Markaz) and its associated Islamic seminary (Darul Uloom Dewsbury), which became one of the first major traditional Islamic boarding schools in Western Europe.</p>
        <div class="modal-bio-section-title">Global Legacy</div>
        <p>Hafiz Patel was renowned for his simple, ascetic lifestyle, his humility, and his tireless travel to advise and counsel communities across the UK, Europe, and the world. His funeral in Dewsbury in 2016 was attended by an estimated 20,000 people from all over the world, representing one of the largest gatherings of its kind in British history, signifying his immense impact on the diaspora.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Co-founded the Dewsbury Markaz and Darul Uloom Dewsbury in West Yorkshire.</li>
            <li>Pioneered the establishment of Tablighi Jamaat across the UK and Europe.</li>
            <li>Helped set up community and educational structures supporting British Gujarati Muslims.</li>
            <li>Renowned globally for pastoral care, inter-community peace, and simple living.</li>
          </ul>
        </div>
      `
    },
    'major-atchia': {
      name: 'Major Amode Ibrahim Atchia',
      tag: 'Innovation & Philanthropy',
      era: '1860 – 1947 &bull; Mauritius',
      img: 'major_atchia.jpg',
      bio: `
        <p><strong>Major Amode Ibrahim Atchia</strong> (also known as Major Atchia) was a legendary Mauritian pioneer, inventor, and philanthropist. He is celebrated as one of Mauritius's greatest historical figures of industrial innovation, bringing hydro-electric power and advanced technology to the Indian Ocean island nation.</p>
        <p>Atchia's ancestors were Surti Sunni Bohras who migrated from the Surat district of South Gujarat to Mauritius in the 19th century, establishing a prominent trading family in Rose-Hill.</p>
        <div class="modal-bio-section-title">Pioneering Mauritian Electrification</div>
        <p>Atchia studied engineering and industrial mechanics, demonstrating a brilliant aptitude for innovation. In the late 19th century, he founded the Reduit Hydro-Electric Power Station, introducing green, renewable electricity to Mauritius for the first time. He went on to introduce modern steam traction engines, ice factories, and mechanized timber mills, revolutionizing the island's infrastructure and sugar-based economy.</p>
        <div class="modal-bio-section-title">Philanthropy and Civic Leadership</div>
        <p>Deeply committed to social welfare, Major Atchia funded the construction of the Rose Hill Sunni Mosque, established local schools, and donated large tracts of land for public parks and community centers. During World War I, he organized Mauritian volunteer forces, earning him the honorary military rank of "Major" and wide-scale civil acclaim.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Introduced hydro-electric power generation to Mauritius in the late 19th century.</li>
            <li>Established the first ice factories and mechanized timber mills on the island.</li>
            <li>Funded the construction of the Rose Hill Sunni Mosque and local schools.</li>
            <li>Honored as a military Major and widely celebrated Mauritian national pioneer.</li>
          </ul>
        </div>
      `
    },
    'ahmed-deedat': {
      name: 'Ahmed Deedat',
      tag: 'Comparative Dawah',
      era: '1918 – 2005 &bull; South Africa',
      img: 'ahmed_deedat.jpg',
      bio: `
        <p><strong>Ahmed Hoosen Deedat</strong> was a world-renowned South African self-taught Islamic scholar, writer, and orator. He is famous globally for his public debates on comparative religion and his role in establishing modern Dawah (Islamic outreach) movements.</p>
        <p>Deedat was born in Tadkeshwar, Surat district, Gujarat, India. His father, a tailor, migrated to South Africa shortly after Ahmed's birth. Ahmed joined him in Durban in 1927, experiencing firsthand the hardships of early Gujarati migrant families under Apartheid segregation.</p>
        <div class="modal-bio-section-title">Rise to Oratorical Prominence</div>
        <p>Working in a local store, Deedat began reading religious literature to engage in interfaith discussions. His natural eloquence, sharp memory, and study of the Bible and Quran propelled him into public speaking. He co-founded the Islamic Propagation Centre International (IPCI) in Durban, printing millions of copies of books and pamphlets distributed globally free of charge.</p>
        <div class="modal-bio-section-title">International Debates and Recognition</div>
        <p>Throughout the 1980s and 1990s, Deedat traveled the world, filling major arenas in the UK, US, Middle East, and Australia for his structured public debates. In 1986, he was awarded the prestigious King Faisal International Prize for Service to Islam, recognizing his dedication to education and interfaith scholarship.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Co-founded the Islamic Propagation Centre International (IPCI) in Durban.</li>
            <li>Awarded the King Faisal International Prize for Service to Islam in 1986.</li>
            <li>Published over 20 books and delivered hundreds of globally broadcast lectures.</li>
            <li>Pioneered comparative religion study structures in South African Muslim circles.</li>
          </ul>
        </div>
      `
    },
    'ajum-hossen': {
      name: 'Ajum Goolam Hossen',
      tag: 'Diaspora Commerce',
      era: '1850 – 1919 &bull; Mauritius',
      img: 'ajum_goolam_hossen.png',
      bio: `
        <p><strong>Ajum Goolam Hossen</strong> was a prominent Mauritian merchant prince, civic leader, and philanthropist. As one of the leading figures of the Gujarati Muslim diaspora in the Mascarene Islands, he played a foundational role in establishing the economic and social fabric of Muslims in Mauritius.</p>
        <p>Born in Rander, near Surat in Gujarat, India, he migrated to Port Louis, Mauritius, where he expanded his family's mercantile empire, trading sugar, textiles, and spices across India, East Africa, and Europe.</p>
        <div class="modal-bio-section-title">Indian Ocean Mercantile Network</div>
        <p>Hossen's business house, Ajum Goolam Hossen & Co., operated a fleet of merchant vessels and managed large-scale wholesale warehouses. He became a close advisor to the Mauritian colonial administration on trade matters, advocating for the interests of South Asian merchant networks and helping establish Port Louis as a premier trade hub in the Indian Ocean.</p>
        <div class="modal-bio-section-title">Community Organization</div>
        <p>Hossen was the primary founder and benefactor of the Sunni Surti Mosque in Port Louis and helped establish the Surti Sunni Muslim Society. He was a champion of Gujarati language preservation, funding schools and providing scholarships for disadvantaged youth, ensuring the diaspora maintained their cultural and educational identity.</p>
        <div class="modal-bio-highlights">
          <h4>Key Achievements</h4>
          <ul>
            <li>Managed a leading Indian Ocean trading house with links from Surat to Port Louis.</li>
            <li>Benefactor and founder of the Sunni Surti Mosque and schools in Mauritius.</li>
            <li>Advocated for the civil rights and economic interests of South Asian immigrants.</li>
            <li>Pioneered Gujarati language instruction and civic societies in the Mascarene Islands.</li>
          </ul>
        </div>
      `
    }
  };

  // Modal Selectors
  const modal = document.getElementById('luminary-modal');
  const modalBody = document.getElementById('luminary-modal-body');
  const modalClose = document.getElementById('luminary-modal-close');
  const modalOverlay = document.getElementById('luminary-modal-overlay');
  const luminaryCards = document.querySelectorAll('.luminary-card');

  function openLuminaryModal(id) {
    const data = biographyData[id];
    if (!data) return;

    let imageHtml = '';
    if (data.img) {
      imageHtml = `<img class="modal-profile-img" src="${data.img}" alt="${data.name}">`;
    } else {
      imageHtml = `
        <div class="modal-profile-img-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 40px; height: 40px;">
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="8" x2="12" y2="20" />
            <line x1="6" y1="12" x2="18" y2="12" />
            <path d="M5 12a7 7 0 0 0 14 0" />
          </svg>
        </div>
      `;
    }

    // Inject Content
    modalBody.innerHTML = `
      <div class="modal-profile-header">
        ${imageHtml}
        <div class="modal-profile-title-container">
          <span class="modal-profile-tag">${data.tag}</span>
          <h2 class="modal-profile-name">${data.name}</h2>
          <span class="modal-profile-era">${data.era}</span>
        </div>
      </div>
      <div class="modal-bio-content">
        ${data.bio}
      </div>
    `;

    // Show Modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  }

  function closeLuminaryModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scroll
  }

  // Event Listeners
  luminaryCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-luminary');
      openLuminaryModal(key);
    });
  });

  modalClose.addEventListener('click', closeLuminaryModal);
  modalOverlay.addEventListener('click', closeLuminaryModal);

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLuminaryModal();
    }
  });

  // Start the quiz
  initQuiz();
});
