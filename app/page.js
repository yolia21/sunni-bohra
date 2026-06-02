'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet Map Component with SSR disabled to prevent "window is not defined" error
const DiasporaMap = dynamic(() => import('./components/DiasporaMap'), {
  ssr: false,
  loading: () => (
    <div className="map-loading-placeholder" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: 'rgba(8, 26, 18, 0.4)',
      color: 'var(--gold-metallic)',
      fontFamily: 'var(--font-accent)',
      letterSpacing: '1px'
    }}>
      Loading Interactive Archives...
    </div>
  )
});

// Biography database for the popup modals
const biographyData = {
  'abdul-ghafur': {
    name: 'Mulla Abdul Ghafur',
    tag: 'Commerce & Shipping',
    era: '17th – 18th Century • Surat',
    img: '/mulla_abdul_ghafur.jpg',
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
    era: '1929 – 2017 • South Africa',
    img: '/kathrada.jpg',
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
    era: 'Contemporary • United Kingdom',
    img: '/issa_brothers.jpg',
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
    era: 'Contemporary • Zimbabwe',
    img: '/mufti_menk.jpg',
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
    era: 'Contemporary • UK / Zambia',
    img: '/sir_alimuddin.jpg',
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
    era: 'Contemporary • India',
    img: '/ghulam_vastanvi.jpg',
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
    era: '1926 – 2016 • United Kingdom',
    img: '/hafiz_patel.jpg',
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
    era: '1860 – 1947 • Mauritius',
    img: '/amodeatchia.jpg',
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
    era: '1918 – 2005 • South Africa',
    img: '/ahmed_deedat.jpg',
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
    era: '1850 – 1919 • Mauritius',
    img: '/ajum_goolam_hossen_and_co.png',
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

// Diaspora metrics database
const diasporaData = {
  india: {
    country: 'ANCESTRAL HOME',
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
  },
  malaysia: {
    country: 'SOUTHEAST ASIA',
    region: 'Malaysia',
    stat: '15,000+',
    desc: 'Sunni Bohra/Vohra merchants from Surat, Rander, and Bharuch migrated along Indian Ocean routes to British Malaya in the 19th and 20th centuries. Establishing successful textile, shipping, and spice importing houses in Penang, Malacca, and Kuala Lumpur, they contributed significantly to local South Asian Muslim community networks.'
  },
  indonesia: {
    country: 'SOUTHEAST ASIA',
    region: 'Indonesia',
    stat: '10,000+',
    desc: 'Gujarati Sunni Bohra merchants established trading houses in Dutch East Indies ports like Batavia (Jakarta), Surabaya, and Medan. Active in textile distribution, spice trade, and international shipping, the community maintained close connections with Southeast Asian mercantile networks.'
  },
  mauritius: {
    country: 'MASCARENE ISLANDS',
    region: 'Mauritius',
    stat: '12,000+',
    desc: 'Arriving in the 19th century, Surti Sunni Bohra merchants became prominent business leaders in Port Louis. They funded the construction of the Sunni Surti Masjid and local educational trusts, playing a major role in the Mascarene Islands\' commercial import-export trade.'
  },
  reunion: {
    country: 'FRENCH INDIAN OCEAN',
    region: 'Reunion Island',
    stat: '15,000+',
    desc: 'A significant diaspora of Surti Sunni Bohras settled in the French overseas department of Reunion Island starting in the late 19th century. Known locally as "Zarabes," they established successful retail, wholesale, and real estate enterprises, building beautiful landmarks like the Noor-e-Islam Mosque in Saint-Denis.'
  },
  zambia: {
    country: 'CENTRAL AFRICA',
    region: 'Zambia',
    stat: '8,000+',
    desc: 'Gujarati Sunni Vohra merchants settled in Lusaka, Chipata, and the Copperbelt region in the 20th century. Operating retail, agriculture, and manufacturing businesses, they established strong community associations and built mosques and educational centers.'
  },
  australia: {
    country: 'OCEANIA',
    region: 'Australia',
    stat: '12,000+',
    desc: 'A modern diaspora of professionals, engineers, IT experts, and business owners who settled in Sydney, Melbourne, Brisbane, and Perth. The community actively organizes cultural gatherings, preserves traditional heritage, and connects families across Oceania.'
  },
  uae: {
    country: 'MIDDLE EAST',
    region: 'United Arab Emirates',
    stat: '30,000+',
    desc: 'Beginning in the mid-20th century, a large community of Sunni Bohras settled in Dubai, Sharjah, and Abu Dhabi. Functioning as key professionals, traders, and entrepreneurs, they represent a highly active and integrated modern diaspora hub in the Gulf.'
  },
  thailand: {
    country: 'SOUTHEAST ASIA',
    region: 'Thailand',
    stat: '6,000+',
    desc: 'Establishing connections in the late 19th century, Sunni Bohra gem merchants and wholesale importers settled in Bangkok along the Chao Phraya River. They established the historic Surti Sunni Masjid in Bangkok, maintaining active commerce and social networks.'
  }
};

// Quiz data
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

export default function Home() {
  // Page Scrolled State
  const [isScrolled, setIsScrolled] = useState(false);
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Active Timeline Card
  const [activeTimeline, setActiveTimeline] = useState(null);
  // Active Subgroups Tab
  const [activeTab, setActiveTab] = useState('tab-surti');
  // Diaspora Map Selected Country
  const [selectedCountry, setSelectedCountry] = useState('india');
  // Selected Luminary for Biography Modal
  const [selectedLuminary, setSelectedLuminary] = useState(null);

  // Quiz States
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [hasQuizAnswered, setHasQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle modal close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedLuminary(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to open modal and lock scroll
  const openLuminary = (id) => {
    setSelectedLuminary(id);
    document.body.style.overflow = 'hidden';
  };

  // Helper to close modal and unlock scroll
  const closeLuminary = () => {
    setSelectedLuminary(null);
    document.body.style.overflow = '';
  };

  // Quiz Mechanics
  const handleSelectOption = (idx) => {
    if (hasQuizAnswered) return;
    setSelectedOption(idx);
    setHasQuizAnswered(true);
    if (idx === quizData[currentQuizIndex].answer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setHasQuizAnswered(false);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setHasQuizAnswered(false);
    setSelectedOption(null);
    setQuizFinished(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const activeDiaspora = diasporaData[selectedCountry] || diasporaData.india;

  return (
    <>
      {/* ==========================================================================
           NAVIGATION BAR
           ========================================================================== */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="#" className="nav-logo" onClick={(e) => handleSmoothScroll(e, '#hero')}>
          <svg viewBox="0 0 100 100">
            <polygon points="50,5 64,36 95,50 64,64 50,95 36,64 5,50 36,36" />
            <polygon points="50,20 59,41 80,50 59,59 50,80 41,59 20,50 41,41" fill="none" stroke="var(--charcoal-bg)" strokeWidth={2} />
            <circle cx={50} cy={50} r={8} fill="var(--gold-metallic)" />
          </svg>
          <span>SUNNI BOHRA HERITAGE</span>
        </a>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')}>Home</a></li>
          <li><a href="#history" onClick={(e) => handleSmoothScroll(e, '#history')}>Timeline</a></li>
          <li><a href="#subgroups" onClick={(e) => handleSmoothScroll(e, '#subgroups')}>Subgroups</a></li>
          <li><a href="#culture" onClick={(e) => handleSmoothScroll(e, '#culture')}>Culture</a></li>
          <li><a href="#diaspora" onClick={(e) => handleSmoothScroll(e, '#diaspora')}>Diaspora</a></li>
          <li><a href="#luminaries" onClick={(e) => handleSmoothScroll(e, '#luminaries')}>Luminaries</a></li>
          <li><a href="#quiz" onClick={(e) => handleSmoothScroll(e, '#quiz')}>Discovery Quiz</a></li>
        </ul>
        <button 
          className="mobile-menu-btn" 
          aria-label="Toggle Menu"
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
      </nav>

      {/* ==========================================================================
           HERO SECTION
           ========================================================================== */}
      <header className="hero-section" id="hero">
        <div className="hero-container">
          <div className="hero-text">
            <span className="hero-tagline">Legacy of the South Gujarat Merchants</span>
            <h1 className="hero-title">
              <span>The Heritage of the</span>
              <span className="gold-glow-text">Sunni Bohras</span>
            </h1>
            <p className="hero-description">
              The <strong>Sunni Bohras</strong> (also known as <i>Sunni Vohras</i>) are a prominent Gujarati Muslim community originating from South Gujarat. Adhering to the <strong>Hanafi school of Sunni Islam</strong> (distinguishing them from the Shia Ismaili Dawoodi Bohras), they trace their origins to local trading, landowning, and agricultural castes. Renowned for their corporate philanthropy and merchant spirit, they built global trading empires and established influential diaspora networks across Africa, Asia, the UK, and North America.
            </p>
            <div className="hero-cta-group">
              <a href="#history" className="btn-primary" onClick={(e) => handleSmoothScroll(e, '#history')}>Explore the Archives</a>
              <a href="#quiz" className="btn-secondary" onClick={(e) => handleSmoothScroll(e, '#quiz')}>Test Your Knowledge</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="jharokha-frame hero-image-wrapper">
              <img src="/gujarati_mercantile_architecture.png" alt="Historic Gujarati Muslim mercantile architecture featuring carved wooden jharokhas and coastal mercantile styles" />
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================================================
           SECTION 1: THE HISTORICAL CHRONICLE (TIMELINE)
           ========================================================================== */}
      <section className="section-padding" id="history">
        <div className="section-header">
          <span className="section-subtitle">Chronology of Faith & Trade</span>
          <h2 className="section-title">The Historical Journey</h2>
          <div className="ornate-divider">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L18.8 19H5.2L12 5.99zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </div>
        </div>

        <div className="timeline-container">
          {/* Item 1 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">11th – 12th Century CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 0 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 0 ? null : 0);
                }
              }}
            >
              <h3>Early Ismaili Missions to Gujarat</h3>
              <p>Fatimid-Musta'li missionaries arrived from Egypt and Yemen, converting local Hindu agrarian and mercantile castes to Islam, establishing the roots of the Bohra community.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 0 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 0 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>During this period, Gujarat's bustling ports, such as Cambay (Khambhat), were critical links in the Indian Ocean trade. Missionaries (Da'is) like Maulai Abdullah and Maulai Nuruddin preached Ismaili Shia doctrines. The local converts, primarily consisting of agriculturalists and traders, adopted the term "Bohra" (derived from the Gujarati word <i>vohorvu</i>, meaning "to trade").</p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">1391 – 1411 CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 1 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 1 ? null : 1);
                }
              }}
            >
              <h3>Muzaffarid Rule & The Jafari Transition</h3>
              <p>Under governor Zafar Khan (later Sultan Muzaffar Shah I), Hanafi Sunni scholars from Delhi gained patronage. The missionary Jafar Patani initiated a conversion movement to Sunni Islam.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 1 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 1 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>Following a dispute in the Ismaili clerical hierarchy, Jafar Patani transitioned to Sunni Islam. Backed by the Sunni ruling Muzaffarid dynasty in Patan, he preached Hanafi Sunni jurisprudence. This created the Jafari (or Patani) Bohra community, the earliest distinct branch of Sunni Bohras.</p>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">1538 CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 2 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 2 ? null : 2);
                }
              }}
            >
              <h3>Consolidation of Sunni Identity</h3>
              <p>Syed Jafar Ahmad Shirazi consolidated the community, encouraging Sunni Bohras to establish independent social institutions and sever ties with Ismaili factions.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 2 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 2 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>Syed Jafar Ahmad Shirazi advocated for a formal separation, urging the Sunni converts to establish independent mosques, Jamatkhanas, and cemeteries. This transition solidified the distinct communal boundary and corporate identity of the Sunni Bohras across Gujarat.</p>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">19th – 20th Century CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 3 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 3 ? null : 3);
                }
              }}
            >
              <h3>Colonial Expansion & Passenger Migration</h3>
              <p>Sunni Bohras expanded internationally as "passenger Indians," migrating to South Africa, East Africa, and later the UK, establishing global trading networks.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 3 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 3 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>Unlike indentured laborers, Sunni Bohras migrated as independent business operators. In South Africa, they built iconic mosques like Durban's Grey Street Juma Masjid, while in the UK, post-WWII migrants established manufacturing and retail businesses in Lancashire and Yorkshire.</p>
              </div>
            </div>
          </div>

          {/* Item 5 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">Late 19th – Early 20th Century CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 4 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 4 ? null : 4);
                }
              }}
            >
              <h3>Expanding Southeast Asian Trade: Burma & Siam</h3>
              <p>Sunni Vohra merchants from Surat and Rander established shipping, timber, and gemstone empires in Yangon (Rangoon), Mandalay, and Bangkok.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 4 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 4 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>Pioneering Gujarati merchants migrated along Indian Ocean routes to British Burma (Myanmar) and the Kingdom of Siam (Thailand). In Yangon, they became major textile, timber, and rice traders, funding the construction of the historic <strong>Surti Sunni Jamah Masjid</strong>. Concurrently in Bangkok, Thailand, gem merchants and wholesale importers settled along the Chao Phraya River, establishing a notable trading footprint and integrating with local South Asian Muslim networks.</p>
              </div>
            </div>
          </div>

          {/* Item 6 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">1947 CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 5 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 5 ? null : 5);
                }
              }}
            >
              <h3>The Partition Era: Migration to Pakistan</h3>
              <p>Following the Partition of British India, a major wave of Sunni Bohras (especially Charotar Vohras) migrated from Gujarat to Karachi and Sindh.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 5 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 5 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>During the Partition of 1947, large segments of the Sunni Vohra community—particularly those from the Charotar region (Kheda and Anand districts) and port cities like Surat—migrated to the newly formed state of Pakistan. Settling primarily in Karachi, they established key community organizations such as the <strong>Charotar Muslim Anjuman</strong> and quickly became influential in Pakistan's manufacturing, wholesale trade, banking, and professional spheres.</p>
              </div>
            </div>
          </div>

          {/* Item 7 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date">1970s – 1990s CE</span>
            <div 
              className={`timeline-content glass-panel ${activeTimeline === 6 ? 'active' : ''}`}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setActiveTimeline(prev => prev === 6 ? null : 6);
                }
              }}
            >
              <h3>Educational & Professional Waves: North America</h3>
              <p>Educational pursuits and professional opportunities drew waves of Sunni Bohras to the United States and Canada, establishing formal diaspora organizations.</p>
              <button className="timeline-expand-btn">
                {activeTimeline === 6 ? 'Read Less' : 'Read More'}
                <svg viewBox="0 0 24 24" style={{ transform: activeTimeline === 6 ? 'rotate(180deg)' : 'none' }}>
                  <path d="M7 10l5 5 5-5H7z"/>
                </svg>
              </button>
              <div className="timeline-details">
                <p>From the 1970s onward, Sunni Bohras migrated to North America for higher education and careers in engineering, medicine, and business. Initially gathering informally, the diaspora established the Muslim Vohra Association in 2002, which was renamed the <strong>Vohra Association of North America (VANA)</strong> in 2019. The association actively connects Charotar and Surti Sunni Bohra families across the US and Canada, supporting cultural heritage preservation, youth mentoring, and community welfare programs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SPOTLIGHT ON LINEAGE SUBSECTION */}
        <div className="spotlight-container">
          <div className="spotlight-card">
            <div className="spotlight-grid">
              <div className="spotlight-text">
                <h3>Ancestor Spotlight: A Vibrant Maritime Mosaic</h3>
                <p>Historically, the lineage of the Sunni Bohra community is a rich tapestry, representing a centuries-old fusion of diverse migrations and indigenous Gujarati traditions. Our shared heritage is defined by a multi-layered mosaic of ancestry: we are descended from native Gujarati communities, drawn from diverse trading, landowning, and agricultural castes—who embraced Hanafi Sunni Islam over generations.</p>
                <div className="highlight">
                  Alongside them, the lineage is bolstered by Middle Eastern ancestry from Arab, Persian, and Hadhrami trading communities who arrived in port cities like Surat, Bharuch, and Rander along the Maritime Silk Road from the 8th century onward. This merging of mercantile cultures defines the community's globally connected, entrepreneurial spirit today.
                </div>
              </div>
              <div className="spotlight-badge">
                <img className="spotlight-badge-img" src="/maritime_mosaic.png" alt="Historical Hadhrami Trade and Migration Routes Map" />
                <h4>Maritime Mosaic</h4>
                <p>A testament to the diverse migration and trade routes that shaped the Sunni Bohras.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           SECTION 2: THE SUBGROUPS OF THE COMMUNITY
           ========================================================================= */}
      <section className="section-padding" id="subgroups" style={{ background: 'rgba(3, 16, 10, 0.5)' }}>
        <div className="section-header">
          <span className="section-subtitle">Regional Divisions & Social Fabric</span>
          <h2 className="section-title">Subgroups of the Community</h2>
          <div className="ornate-divider">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L18.8 19H5.2L12 5.99zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </div>
        </div>

        <div className="subgroups-container">
          <div className="tabs-navigation">
            <button className={`tab-btn ${activeTab === 'tab-surti' ? 'active' : ''}`} onClick={() => setActiveTab('tab-surti')}>Surti Sunni Bohras</button>
            <button className={`tab-btn ${activeTab === 'tab-bharuchi' ? 'active' : ''}`} onClick={() => setActiveTab('tab-bharuchi')}>Bharuchi Sunni Bohras</button>
            <button className={`tab-btn ${activeTab === 'tab-patani' ? 'active' : ''}`} onClick={() => setActiveTab('tab-patani')}>Patani / Jafari Bohras</button>
            <button className={`tab-btn ${activeTab === 'tab-charotar' ? 'active' : ''}`} onClick={() => setActiveTab('tab-charotar')}>Charotar Vohras</button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'tab-surti' && (
            <div className="tab-content active" id="tab-surti">
              <div className="subgroup-showcase">
                <div className="subgroup-info">
                  <h3>Surti Sunni Bohras</h3>
                  <span className="subgroup-location">South of Narmada River (Surat, Tadkeshwar, Barbodhan)</span>
                  <p className="subgroup-description">
                    Residing in Surat and its surrounding villages, the Surtis are historically renowned as elite international merchants, ship owners, jewelers, and textile traders.
                  </p>
                  <ul className="subgroup-details-list">
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <div>
                        <strong>Primary Geography</strong>
                        <span>Surat city, Rander, Barbodhan, Kathor, Tadkeshwar, Kosamba, Kholvad, and Variav.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                      <div>
                        <strong>Common Surnames</strong>
                        <span>Surti, Vohra, Bham, Barbodhanwala, Kathrada, Bhyat, and Amejee.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
                      <div>
                        <strong>Diaspora Footprint</strong>
                        <span>Mainly South Africa (known as Surtis), United Kingdom, Reunion Island, and Canada.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="subgroup-media">
                  <img src="/surti_port.jpg" alt="Historic painting of the Port of Surat featuring international trade ships and the fortress" />
                  <div className="subgroup-media-overlay">
                    <p>Historic Port of Surat & Merchant Shipping</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tab-bharuchi' && (
            <div className="tab-content active" id="tab-bharuchi">
              <div className="subgroup-showcase">
                <div className="subgroup-info">
                  <h3>Bharuchi Sunni Bohras</h3>
                  <span className="subgroup-location">North of Narmada River (Bharuch, Tankaria, Ikhar)</span>
                  <p className="subgroup-description">
                    Settled in the fertile plains of Bharuch, this subgroup is historically associated with cotton farming and landownership, transitioning to major textile trading and global commerce.
                  </p>
                  <ul className="subgroup-details-list">
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <div>
                        <strong>Primary Geography</strong>
                        <span>Bharuch district, Tankaria, Ikhar, Nabipur, Dayadara, Karmad, Kavi, and Sarod.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                      <div>
                        <strong>Common Surnames</strong>
                        <span>Widely use the surname <strong>Patel</strong> (denoting agricultural leadership), as well as Vahora and regional village surnames.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
                      <div>
                        <strong>Diaspora Footprint</strong>
                        <span>Predominantly the United Kingdom (Preston, Blackburn, Leicester), Canada, and South Africa.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="subgroup-media">
                  <img src="/bharuch_bridge.jpg" alt="Historic view of Bharuch city along the Narmada River" />
                  <div className="subgroup-media-overlay">
                    <p>The Narmada River & Historical Bharuch Waterfront</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tab-patani' && (
            <div className="tab-content active" id="tab-patani">
              <div className="subgroup-showcase">
                <div className="subgroup-info">
                  <h3>Patani / Jafari Bohras</h3>
                  <span className="subgroup-location">North Gujarat (Patan, Kadi, Ahmedabad, Mehsana)</span>
                  <p className="subgroup-description">
                    The oldest branch of the Sunni Bohras, originating directly from the conversions initiated by Jafar Patani in the 15th century. They have historically worked as weavers, traders, and scholars.
                  </p>
                  <ul className="subgroup-details-list">
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <div>
                        <strong>Primary Geography</strong>
                        <span>Patan (the historical capital), Kadi, Ahmedabad city, and Mehsana.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                      <div>
                        <strong>Common Surnames</strong>
                        <span>Patni, Patani, Jafari, Vohra, and Ahmedabadwala.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
                      <div>
                        <strong>Diaspora Footprint</strong>
                        <span>Significant migration to Pakistan (Karachi) after 1947, alongside smaller numbers in the UK and USA.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="subgroup-media">
                  <img src="/patan_ranikivav.jpg" alt="Rani ki Vav stepwell in Patan, representing the historical capital of the Patani Bohras" />
                  <div className="subgroup-media-overlay">
                    <p>Rani ki Vav Stepwell in Patan</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tab-charotar' && (
            <div className="tab-content active" id="tab-charotar">
              <div className="subgroup-showcase">
                <div className="subgroup-info">
                  <h3>Charotar Vohras</h3>
                  <span className="subgroup-location">Central Gujarat (Anand, Vadodara, Nadiad, Kheda)</span>
                  <p className="subgroup-description">
                    Settled in the fertile "Charotar" region, these Vohras are historically agriculturists specializing in cash crop cultivation (like tobacco and food grains) and regional wholesale trade.
                  </p>
                  <ul className="subgroup-details-list">
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      <div>
                        <strong>Primary Geography</strong>
                        <span>Anand, Nadiad, Kheda, Petlad, and Vadodara.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
                      <div>
                        <strong>Common Surnames</strong>
                        <span>Patel, Vohra, Charotarwala, and Kadiwal.</span>
                      </div>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/></svg>
                      <div>
                        <strong>Diaspora Footprint</strong>
                        <span>Mainly USA, Canada, and the United Kingdom.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="subgroup-media">
                  <img src="/charotar.jpg" alt="Map of the Charotar region showing Anand, Nadiad, Petlad, Borsad, and Dharmaj" />
                  <div className="subgroup-media-overlay">
                    <p>Map of the Historical Charotar Region</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
           SECTION 3: THE CULTURAL EXHIBIT
           ========================================================================== */}
      <section className="section-padding" id="culture">
        <div className="section-header">
          <span className="section-subtitle">Heritage, Attire & Traditions</span>
          <h2 className="section-title">The Cultural Exhibit</h2>
          <div className="ornate-divider">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L18.8 19H5.2L12 5.99zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </div>
        </div>

        <div className="cultural-grid">
          {/* CUISINE */}
          <div className="cultural-card glass-panel">
            <div className="cultural-card-header">
              <div className="cultural-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v6.27c.83-.51 1.79-.8 2.82-.8 3.01 0 5.15 2.53 5.15 5.53v9h-8v2h9c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z"/></svg>
              </div>
              <h3>Culinary Traditions</h3>
            </div>
            <p>
              Sunni Bohra cuisine is a rich fusion of traditional Gujarati vegetarian flavors with heavy Mughal and Central Asian influence. Famous for large communal dining styles, dishes are cooked in massive copper vessels (degs). Key items include Bohra Biryani, Khichda (a slow-cooked mutton, wheat, and lentil porridge similar to Haleem), and rich festive sweets.
            </p>
            <div className="cultural-badge-list">
              <span className="cultural-badge">Bohra Biryani</span>
              <span class="cultural-badge">Mutton Khichda</span>
              <span className="cultural-badge">Festive Mithai</span>
              <span className="cultural-badge">Kari-Chawal</span>
            </div>
          </div>

          {/* LINGUISTIC HERITAGE */}
          <div className="cultural-card glass-panel">
            <div className="cultural-card-header">
              <div className="cultural-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M21 5c-1.11-.9-2.58-1.4-4-1.4-1.7 0-3.4.7-4.5 1.8-1.1-1.1-2.8-1.8-4.5-1.8-1.42 0-2.89.5-4 1.4v13.5c1.11-.9 2.58-1.4 4-1.4 1.7 0 3.4.7 4.5 1.8 1.1-1.1 2.8-1.8 4.5-1.8 1.42 0 2.89.5 4 1.4V5zm-1.5 12c-1.04-.6-2.22-.9-3.5-.9-1.8 0-3.46.74-4.5 1.95V6.15c.98-.82 2.37-1.35 4.5-1.35 1.39 0 2.6.45 3.5 1.05V17z"/></svg>
              </div>
              <h3>Linguistic Heritage</h3>
            </div>
            <p>
              Unlike the Dawoodi Bohras, who utilize *Lisan al-Dawat* (a stylized Gujarati dialect heavily infused with Arabic loanwords and written in the Arabic Naskh script), Sunni Bohras utilize standard <strong>Gujarati</strong> written in the native Gujarati script. They maintain a close bilingual relationship with <strong>Urdu</strong>. Historically, many religious treatises, ledger books, and familial chronicles were written in <strong>Gujri</strong> or *Gujarati-Urdu*—a specialized historical script variant where the Gujarati language was written using modified Perso-Arabic letters.
            </p>
            <div className="cultural-badge-list">
              <span className="cultural-badge">Gujarati Script</span>
              <span className="cultural-badge">Urdu Integration</span>
              <span className="cultural-badge">Gujri Script Variant</span>
              <span className="cultural-badge">Bilingualism</span>
            </div>
          </div>

          {/* ATTIRE */}
          <div className="cultural-card glass-panel">
            <div className="cultural-card-header">
              <div className="cultural-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v11h-2V9H9v11H7V9H1c-.55 0-1-.45-1-1s.45-1 1-1h22c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
              </div>
              <h3>Attire & Modesty</h3>
            </div>
            <p>
              The Sunni Bohra community does not wear a specific, uniform sectarian religious attire like the Dawoodi Bohra *Libas al-Anwar* (which features a white three-piece kurta/saya/topi for men and the colorful two-piece rida for women). Instead, Sunni Bohras practice general modesty in line with South Asian Sunni traditions: men wear standard kurtas or Western formalwear, and women wear elegant saris, shalwar kameez, or modest modern attire.
            </p>
            <div className="cultural-badge-list">
              <span className="cultural-badge">Modest Attire</span>
              <span className="cultural-badge">Sari & Shalwar</span>
              <span className="cultural-badge">No Sectarian Uniform</span>
            </div>
          </div>

          {/* ARCHITECTURE */}
          <div className="cultural-card glass-panel">
            <div className="cultural-card-header">
              <div className="cultural-icon-wrapper">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              </div>
              <h3>Architecture & Jamats</h3>
            </div>
            <p>
              The visual legacy of the coastal Sunni Bohras features historic homes with carved wooden facades, overhanging balconies (jharokhas), and internal courtyards tailored for the hot maritime climate of Surat and Bharuch. Community affairs are governed strictly through local *jamats* (caste councils) operating out of Jamatkhanas, managing educational trusts, orphanages, and large medical centers.
            </p>
            <div className="cultural-badge-list">
              <span className="cultural-badge">Jharokha Windows</span>
              <span className="cultural-badge">Jamat Bandi</span>
              <span className="cultural-badge">Darul Ulooms</span>
              <span className="cultural-badge">Welfare Trusts</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           SECTION 4: THE GLOBAL DIASPORA ARCHIVE (MAP)
           ========================================================================== */}
      <section className="section-padding" id="diaspora" style={{ background: 'rgba(3, 16, 10, 0.5)' }}>
        <div className="section-header">
          <span className="section-subtitle">Migration Routes & Modern Networks</span>
          <h2 className="section-title">The Global Footprint</h2>
          <div className="ornate-divider">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L18.8 19H5.2L12 5.99zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </div>
        </div>

        <div className="map-section-wrapper">
          {/* Dynamically imported React Leaflet Map */}
          <div className="map-container" style={{ position: 'relative', height: '500px', flex: 1.2 }}>
            <DiasporaMap 
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
          </div>

          {/* Sidebar metrics display */}
          <div className="diaspora-info-panel glass-panel" style={{ flex: 0.8 }}>
            {!selectedCountry ? (
              <div id="diaspora-prompt" className="diaspora-prompt">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <p>Select a highlighted region on the map to explore the Sunni Bohra migration records.</p>
              </div>
            ) : (
              <div id="diaspora-content" className="diaspora-content active">
                <span className="diaspora-country">{activeDiaspora.country}</span>
                <h3 className="diaspora-region-name">{activeDiaspora.region}</h3>
                <div className="diaspora-stat">
                  {activeDiaspora.stat} <span>Estimated Population & Descendants</span>
                </div>
                <p className="diaspora-body">{activeDiaspora.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           SECTION 5: NOTABLE LUMINARIES
           ========================================================================== */}
      <section className="section-padding" id="luminaries" style={{ background: 'rgba(8, 26, 18, 0.3)' }}>
        <div className="section-header">
          <span className="section-subtitle">Prominent Personalities</span>
          <h2 className="section-title">Notable Luminaries</h2>
          <div className="ornate-divider">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L18.8 19H5.2L12 5.99zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </div>
        </div>

        <div className="luminaries-container">
          <div className="luminaries-grid">
            {Object.keys(biographyData).map((key) => {
              const luminary = biographyData[key];
              return (
                <div key={key} className="luminary-card" onClick={() => openLuminary(key)}>
                  <div className="luminary-card-image-wrapper">
                    <img className="luminary-card-img" src={luminary.img} alt={luminary.name} />
                    <div className="luminary-badge-icon">
                      {key === 'abdul-ghafur' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx={12} cy={5} r={3} />
                          <line x1="12" y1="8" x2="12" y2="20" />
                          <line x1="6" y1="12" x2="18" y2="12" />
                          <path d="M5 12a7 7 0 0 0 14 0" />
                        </svg>
                      )}
                      {key === 'kathrada' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="3" x2="12" y2="21" />
                          <line x1="3" y1="7" x2="21" y2="7" />
                          <path d="M6 7l-3 9h6l-3-9zm12 0l-3 9h6l-3-9z" />
                          <path d="M12 21h6M12 21H6" />
                        </svg>
                      )}
                      {key === 'issa-brothers' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      )}
                      {(key === 'mufti-menk' || key === 'hafiz-patel') && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      )}
                      {key === 'sir-alimuddin' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12M12 3v11M8 14h8L19 21H5l3-7z" />
                        </svg>
                      )}
                      {key === 'vastanvi' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c0 2 2.7 3 6 3s6-1 6-3v-5" />
                        </svg>
                      )}
                      {key === 'major-atchia' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx={12} cy={12} r={3} />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      )}
                      {key === 'ahmed-deedat' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                        </svg>
                      )}
                      {key === 'ajum-hossen' && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className={`luminary-tag ${
                    key === 'abdul-ghafur' || key === 'ajum-hossen' ? 'tag-commerce' :
                    key === 'kathrada' ? 'tag-activism' :
                    key === 'issa-brothers' ? 'tag-enterprise' :
                    key === 'mufti-menk' || key === 'hafiz-patel' ? 'tag-scholarship' :
                    key === 'sir-alimuddin' ? 'tag-science' :
                    key === 'vastanvi' ? 'tag-education' :
                    key === 'major-atchia' ? 'tag-innovation' : 'tag-oratory'
                  }`}>
                    {luminary.tag}
                  </span>
                  <h3 className="luminary-name">{luminary.name}</h3>
                  <span className="luminary-era" dangerouslySetInnerHTML={{ __html: luminary.era }}></span>
                  <p className="luminary-bio">{luminary.bio.replace(/<[^>]*>/g, '').substring(0, 160).trim()}...</p>
                  <span className="luminary-read-more">Read Biography &rarr;</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           SECTION 6: INTERACTIVE DISCOVERY QUIZ
           ========================================================================== */}
      <section className="section-padding" id="quiz">
        <div className="section-header">
          <span className="section-subtitle">Heritage Verification</span>
          <h2 className="section-title">Discovery Quiz</h2>
          <div className="ornate-divider">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L18.8 19H5.2L12 5.99zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
          </div>
        </div>

        <div className="quiz-wrapper">
          {!quizFinished ? (
            <div id="quiz-active-screen">
              <div className="quiz-header">
                <span className="quiz-progress">Question {currentQuizIndex + 1} of {quizData.length}</span>
                <span className="quiz-score-tracker">Score: <strong>{quizScore}</strong></span>
              </div>
              <div className="quiz-question-container">
                <h3>{quizData[currentQuizIndex].question}</h3>
                <div className="quiz-options">
                  {quizData[currentQuizIndex].options.map((option, idx) => {
                    let btnClass = 'option-btn';
                    if (hasQuizAnswered) {
                      if (idx === quizData[currentQuizIndex].answer) {
                        btnClass += ' correct';
                      } else if (idx === selectedOption) {
                        btnClass += ' incorrect';
                      }
                    }
                    return (
                      <button 
                        key={idx}
                        className={btnClass}
                        onClick={() => handleSelectOption(idx)}
                        disabled={hasQuizAnswered}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
              {hasQuizAnswered && (
                <div className={`quiz-feedback-box active ${
                  selectedOption === quizData[currentQuizIndex].answer ? 'correct-box' : 'incorrect-box'
                }`}>
                  {selectedOption === quizData[currentQuizIndex].answer ? 'Correct! ' : 'Incorrect. '}
                  {quizData[currentQuizIndex].explanation}
                </div>
              )}
              {hasQuizAnswered && (
                <div className="quiz-action-area">
                  <button 
                    className="btn-primary"
                    onClick={handleNextQuiz}
                  >
                    {currentQuizIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div id="quiz-results" className="quiz-results-screen active">
              <div className="quiz-results-card glass-panel">
                <div className="laurel-medal-icon">
                  <svg viewBox="0 0 100 100">
                    <path d="M50,10 C25,10 15,35 15,60 C15,80 30,90 50,90 C70,90 85,80 85,60 C85,35 75,10 50,10 Z" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} />
                    <circle cx="50" cy="50" r="18" fill="var(--gold-metallic)" />
                    <path d="M40,50 L47,57 L60,42" fill="none" stroke="var(--emerald-deep)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Quiz Completed!</h3>
                <div className="quiz-final-score">
                  Your Score: <strong id="quiz-final-score-val">{quizScore} / {quizData.length}</strong>
                </div>
                <p id="quiz-remarks-text">
                  {quizScore === quizData.length && "Excellent! You are a master of Sunni Bohra history and heritage. You've fully explored their architectural, theological, and geographic legacies."}
                  {quizScore >= 3 && quizScore < quizData.length && "Well done! You have a strong grasp of the Sunni Bohra community's roots, their mercantile migration, and their distinctive culture."}
                  {quizScore < 3 && "A good start! Review the website sections above to discover more about the historical schisms, regional subgroups, and mercantile networks."}
                </p>
                <button 
                  className="btn-primary"
                  onClick={handleRestartQuiz}
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
           FOOTER
           ========================================================================== */}
      <footer className="footer" style={{
        background: 'rgba(3, 16, 10, 0.95)',
        borderTop: '1px solid var(--gold-metallic)',
        padding: '4rem 2rem 2rem 2rem',
        color: 'var(--marble-cream)'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }} className="footer-grid">
          <div>
            <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-metallic)', fontSize: '1.2rem', marginBottom: '1rem' }}>SUNNI BOHRA HERITAGE</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(245,242,235,0.7)', lineHeight: '1.6' }}>
              An interactive digital archive dedicated to documenting the history, regional subgroups, cultural identity, and global diaspora networks of the Hanafi Sunni Vohra/Bohra community of South Gujarat.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold-metallic)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>COMMUNITY SECTIONS</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Hero Introduction</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#history" onClick={(e) => handleSmoothScroll(e, '#history')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Historical Timeline</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#subgroups" onClick={(e) => handleSmoothScroll(e, '#subgroups')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Community Subgroups</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#culture" onClick={(e) => handleSmoothScroll(e, '#culture')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Cultural Exhibit</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold-metallic)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>GLOBAL ARCHIVES</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><a href="#diaspora" onClick={(e) => handleSmoothScroll(e, '#diaspora')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Global Footprint</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#luminaries" onClick={(e) => handleSmoothScroll(e, '#luminaries')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Notable Luminaries</a></li>
              <li style={{ marginBottom: '0.5rem' }}><a href="#quiz" onClick={(e) => handleSmoothScroll(e, '#quiz')} style={{ textDecoration: 'none', color: 'rgba(245,242,235,0.7)', fontSize: '0.9rem' }}>Discovery Quiz</a></li>
            </ul>
          </div>
        </div>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderTop: '1px solid rgba(212,175,55,0.15)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'rgba(245,242,235,0.5)'
        }}>
          &copy; {new Date().getFullYear()} Sunni Bohra Heritage Archive. Built to preserve and share our community legacy.
        </div>
      </footer>

      {/* ==========================================================================
           LUMINARY BIOGRAPHY MODAL (GLASSMORPHIC POPUP)
           ========================================================================== */}
      {selectedLuminary && (
        <div id="luminary-modal" className="luminary-modal active" role="dialog" aria-modal="true">
          <div className="luminary-modal-overlay" onClick={closeLuminary}></div>
          <div className="luminary-modal-card glass-panel">
            <button 
              id="luminary-modal-close" 
              className="modal-close-btn" 
              aria-label="Close Biography"
              onClick={closeLuminary}
            >
              &times;
            </button>
            <div id="luminary-modal-body">
              <div className="modal-profile-header">
                {biographyData[selectedLuminary].img ? (
                  <img className="modal-profile-img" src={biographyData[selectedLuminary].img} alt={biographyData[selectedLuminary].name} />
                ) : (
                  <div className="modal-profile-img-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
                      <circle cx={12} cy={5} r={3} />
                      <line x1={12} y1={8} x2="12" y2="20" />
                      <line x1={6} y1={12} x2="18" y2="12" />
                      <path d="M5 12a7 7 0 0 0 14 0" />
                    </svg>
                  </div>
                )}
                <div className="modal-profile-title-container">
                  <span className="modal-profile-tag">{biographyData[selectedLuminary].tag}</span>
                  <h2 className="modal-profile-name">{biographyData[selectedLuminary].name}</h2>
                  <span className="modal-profile-era" dangerouslySetInnerHTML={{ __html: biographyData[selectedLuminary].era }}></span>
                </div>
              </div>
              <div 
                className="modal-bio-content" 
                dangerouslySetInnerHTML={{ __html: biographyData[selectedLuminary].bio }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
