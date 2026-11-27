const PORTAL_DATA = [
  {
    title: "General Awareness",
    colorClass: "General_Awareness",
    topics: [
      {
        name: "Geography",
        subtopics: [
          { name: "1. General Introduction", file: "General_Awareness/Geography/General_Introduction" },
          { name: "2. Geological Structure", file: "General_Awareness/Geography/Geological_Structure" },
          { name: "3. Geomorphic Regions", file: "General_Awareness/Geography/Geomorphic_Regions" },
          { name: "4. Drainage System", file: "General_Awareness/Geography/Drainage_System" },
          { name: "5. Soils of India", file: "General_Awareness/Geography/Soils_of_India" },
          { name: "6. Agriculture and Animal Husbandry", file: "General_Awareness/Geography/Agriculture_and_Animal_Husbandry" },
          { name: "7. Mineral Resources in India", file: "General_Awareness/Geography/Mineral_Resources_in_India" },
          { name: "8. Industry in India", file: "General_Awareness/Geography/Industry_in_India" },
          { name: "9. Water Resources, Irrigation and Multipurpose Projects", file: "General_Awareness/Geography/Water_Resources_Irrigation_and_Multipurpose_Projects" },
          { name: "10. Energy Resources", file: "General_Awareness/Geography/Energy_Resources" },
          { name: "11. Transport in India", file: "General_Awareness/Geography/Transport_in_India" },
          { name: "12. State & Union Territory of India", file: "General_Awareness/Geography/State_and_Union_Territory_of_India" }
        ]
      },
      {
        name: "Ancient India",
        subtopics: [
          { name: "1. Stone Age, Metal Age and Chalcolithic Age", file: "General_Awareness/Ancient_India/Stone_Age_Metal_Age_and_Chalcolithic_Age" },
          { name: "2. Indus Valley Civilization", file: "General_Awareness/Ancient_India/Indus_Valley_Civilization" },
          { name: "3. Vedic Age", file: "General_Awareness/Ancient_India/Vedic_Age" },
          { name: "4. Mahajanapadas and the Rise of Magadha", file: "General_Awareness/Ancient_India/Mahajanapadas_and_the_Rise_of_Magadha" },
          { name: "5. Mauryan Empire", file: "General_Awareness/Ancient_India/Mauryan_Empire" },
          { name: "6. Post-Mauryan Empire", file: "General_Awareness/Ancient_India/Post_Mauryan_Empire" },
          { name: "7. Buddhism and Jainism", file: "General_Awareness/Ancient_India/Buddhism_and_Jainism" },
          { name: "8. Gupta Period", file: "General_Awareness/Ancient_India/Gupta_Period" },
          { name: "9. Post-Gupta Period and Rajput Dynasties", file: "General_Awareness/Ancient_India/Post_Gupta_Period_and_Rajput_Dynasties" },
          { name: "10. Sangam Age and Kingdoms of South India", file: "General_Awareness/Ancient_India/Sangam_Age_and_Kingdoms_of_South_India" }
        ]
      },
      {
        name: "Medieval India",
        subtopics: [
          { name: "11. Foreign Invasions and Medieval India", file: "General_Awareness/Medieval_India/Foreign_Invasions_and_Medieval_India" },
          { name: "12. Sources of Medieval India and the Slave Dynasty", file: "General_Awareness/Medieval_India/Sources_of_Medieval_India_and_the_Slave_Dynasty" },
          { name: "13. Khilji and Tughlaq Dynasties", file: "General_Awareness/Medieval_India/Khilji_and_Tughlaq_Dynasties" },
          { name: "14. Sayyid and Lodhi Dynasties", file: "General_Awareness/Medieval_India/Sayyid_and_Lodhi_Dynasties" },
          { name: "15. Vijayanagar and Bahmani Kingdoms", file: "General_Awareness/Medieval_India/Vijayanagar_and_Bahmani_Kingdoms" },
          { name: "16. Babur, Humayun and Sher Shah Suri", file: "General_Awareness/Medieval_India/Babur_Humayun_and_Sher_Shah_Suri" },
          { name: "17. Akbar and Jahangir", file: "General_Awareness/Medieval_India/Akbar_and_Jahangir" },
          { name: "18. Shah Jahan and Aurangzeb", file: "General_Awareness/Medieval_India/Shah_Jahan_and_Aurangzeb" },
          { name: "18-A. Mughal Administrative Structure", file: "General_Awareness/Medieval_India/Mughal_Administrative_Structure" },
          { name: "19. Post-Mughal Period (Later Mughals)", file: "General_Awareness/Medieval_India/Post_Mughal_Period_Later_Mughals" },
          { name: "20. Bhakti, Sufi and Maratha", file: "General_Awareness/Medieval_India/Bhakti_Sufi_and_Maratha" }
        ]
      },
      {
        name: "Modern India",
        subtopics: [
          { name: "21. Advent of the Europeans", file: "General_Awareness/Modern_India/Advent_of_the_Europeans" },
          { name: "22. Autonomous States of the 18th Century", file: "General_Awareness/Modern_India/Autonomous_States_of_the_18th_Century" },
          { name: "23. The British Conquest of India", file: "General_Awareness/Modern_India/The_British_Conquest_of_India" },
          { name: "24. Expansion of British Power", file: "General_Awareness/Modern_India/Expansion_of_British_Power" },
          { name: "25. Economic and Administrative Policies", file: "General_Awareness/Modern_India/Economic_and_Administrative_Policies" },
          { name: "26. Socio-Religious Reform Movements", file: "General_Awareness/Modern_India/Socio_Religious_Reform_Movements" },
          { name: "27. Peasant and Tribal Movements", file: "General_Awareness/Modern_India/Peasant_and_Tribal_Movements" },
          { name: "28. Revolt of 1857", file: "General_Awareness/Modern_India/Revolt_of_1857" },
          { name: "29. Development of Political Consciousness", file: "General_Awareness/Modern_India/Development_of_Political_Consciousness" },
          { name: "30. Rise of Indian Nationalism", file: "General_Awareness/Modern_India/Rise_of_Indian_Nationalism" },
          { name: "31. Second Phase of the National Movement", file: "General_Awareness/Modern_India/Second_Phase_of_the_National_Movement" },
          { name: "32. Emergence of Gandhi", file: "General_Awareness/Modern_India/Emergence_of_Gandhi" },
          { name: "33. Revolutionary Activities", file: "General_Awareness/Modern_India/Revolutionary_Activities" },
          { name: "34. Freedom Struggle", file: "General_Awareness/Modern_India/Freedom_Struggle" },
          { name: "35. Freedom Struggle II — The 1940s and Partition", file: "General_Awareness/Modern_India/Freedom_Struggle_II_The_1940s_and_Partition" },
          { name: "36. Governor-Generals and Viceroys of India", file: "General_Awareness/Modern_India/Governor_Generals_and_Viceroys_of_India" }
        ]
      },
      {
        name: "Polity",
        subtopics: [
          { name: "1. Historical Background", file: "General_Awareness/Polity/Historical_Background" },
          { name: "2. Making of the Constitution", file: "General_Awareness/Polity/Making_of_the_Constitution" },
          { name: "3. Various Sources and Salient Features of the Constitution", file: "General_Awareness/Polity/Various_Sources_and_Salient_Features_of_the_Constitution" },
          { name: "4. Preamble and Schedules", file: "General_Awareness/Polity/Preamble_and_Schedules" },
          { name: "5. India and Its Territory and Citizenship", file: "General_Awareness/Polity/India_and_Its_Territory_and_Citizenship" },
          { name: "6. Fundamental Rights", file: "General_Awareness/Polity/Fundamental_Rights" },
          { name: "7. Directive Principles of State Policy", file: "General_Awareness/Polity/Directive_Principles_of_State_Policy" },
          { name: "8. Fundamental Duties and Doctrine of Basic Structure", file: "General_Awareness/Polity/Fundamental_Duties_and_Doctrine_of_Basic_Structure" },
          { name: "9. President of India", file: "General_Awareness/Polity/President_of_India" },
          { name: "10. Vice-President of India", file: "General_Awareness/Polity/Vice_President_of_India" },
          { name: "11. PM, Council of Ministers and Attorney General", file: "General_Awareness/Polity/PM_Council_of_Ministers_and_Attorney_General" },
          { name: "12. Parliament", file: "General_Awareness/Polity/Parliament" },
          { name: "13. State Executive and State Legislature", file: "General_Awareness/Polity/State_Executive_and_State_Legislature" },
          { name: "14. Supreme Court, High Court and Subordinate Court", file: "General_Awareness/Polity/Supreme_Court_High_Court_and_Subordinate_Court" },
          { name: "15. Centre-State Relations and Emergency Provisions", file: "General_Awareness/Polity/Centre_State_Relations_and_Emergency_Provisions" },
          { name: "16. Local Self-Government", file: "General_Awareness/Polity/Local_Self_Government" },
          { name: "17. Scheduled and Tribal Areas", file: "General_Awareness/Polity/Scheduled_and_Tribal_Areas" },
          { name: "18. Electoral System and Constitutional Bodies", file: "General_Awareness/Polity/Electoral_System_and_Constitutional_Bodies" }
        ]
      },
      {
        name: "Economics",
        subtopics: [
          { name: "1. GDP, GNP National Income", file: "General_Awareness/Economics/GDP_GNP_National_Income" },
          { name: "2. Banking Sector", file: "General_Awareness/Economics/Banking_Sector" },
          { name: "3. Capital Market", file: "General_Awareness/Economics/Capital_Market" },
          { name: "4. Classification of Economies", file: "General_Awareness/Economics/Classification_of_Economies" },
          { name: "5. Unemployment and Poverty", file: "General_Awareness/Economics/Unemployment_and_Poverty" },
          { name: "6. Various Sectors of Economy", file: "General_Awareness/Economics/Various_Sectors_of_Economy" },
          { name: "7. Five Year Planning", file: "General_Awareness/Economics/Five_Year_Planning" },
          { name: "8. External Sector of India", file: "General_Awareness/Economics/External_Sector_of_India" },
          { name: "9. International Financial Institutions & Agriculture", file: "General_Awareness/Economics/International_Financial_Institutions_and_Agriculture" },
          { name: "10. Taxation", file: "General_Awareness/Economics/Taxation" },
          { name: "11. Budget", file: "General_Awareness/Economics/Budget" },
          { name: "12. Inflation & Types of Money", file: "General_Awareness/Economics/Inflation_and_Types_of_Money" },
          { name: "13. Industrial Policies and Industrial Development in India", file: "General_Awareness/Economics/Industrial_Policies_and_Industrial_Development_in_India" },
          { name: "14. Census", file: "General_Awareness/Economics/Census" }
        ]
      },
      {
        name: "Physics",
        subtopics: [
          { name: "1. Kinematics", file: "General_Awareness/Physics/Kinematics" },
          { name: "2. Speed, Velocity & Acceleration", file: "General_Awareness/Physics/Speed_Velocity_and_Acceleration" },
          { name: "3. Projectile Motion & Its Properties", file: "General_Awareness/Physics/Projectile_Motion_and_Its_Properties" },
          { name: "4. Circular Motion & Its Types", file: "General_Awareness/Physics/Circular_Motion_and_Its_Types" },
          { name: "5. Force & Its Applications", file: "General_Awareness/Physics/Force_and_Its_Applications" },
          { name: "6. Newton's Laws", file: "General_Awareness/Physics/Newtons_Laws" },
          { name: "7. Friction & Its Uses", file: "General_Awareness/Physics/Friction_and_Its_Uses" },
          { name: "8. Oscillations & Waves", file: "General_Awareness/Physics/Oscillations_and_Waves" },
          { name: "9. Sound & Its Properties", file: "General_Awareness/Physics/Sound_and_Its_Properties" },
          { name: "10. Heat & Its Properties", file: "General_Awareness/Physics/Heat_and_Its_Properties" },
          { name: "11. All About Matter", file: "General_Awareness/Physics/All_About_Matter" },
          { name: "12. Atmospheric Pressure", file: "General_Awareness/Physics/Atmospheric_Pressure" },
          { name: "13. Archimedes Principle", file: "General_Awareness/Physics/Archimedes_Principle" },
          { name: "14. Surface Tension & Its Applications", file: "General_Awareness/Physics/Surface_Tension_and_Its_Applications" },
          { name: "15. Light", file: "General_Awareness/Physics/Light" },
          { name: "16. Examples of Atmospheric Refraction", file: "General_Awareness/Physics/Examples_of_Atmospheric_Refraction" },
          { name: "17. Magnetism & Electricity", file: "General_Awareness/Physics/Magnetism_and_Electricity" },
          { name: "18. All About Nuclear Reactor", file: "General_Awareness/Physics/All_About_Nuclear_Reactor" },
          { name: "19. Work, Power & Energy", file: "General_Awareness/Physics/Work_Power_and_Energy" }
        ]
      },
      {
        name: "Chemistry",
        subtopics: [
          { name: "1. Acid & Its Properties", file: "General_Awareness/Chemistry/Acid_and_Its_Properties" },
          { name: "2. Bases", file: "General_Awareness/Chemistry/Bases" },
          { name: "3. Salt & Its Applications", file: "General_Awareness/Chemistry/Salt_and_Its_Applications" },
          { name: "4. All About pH Scale", file: "General_Awareness/Chemistry/All_About_pH_Scale" },
          { name: "5. Atom & Its Particles", file: "General_Awareness/Chemistry/Atom_and_Its_Particles" },
          { name: "6. Uses of Important Elements & Compounds", file: "General_Awareness/Chemistry/Uses_of_Important_Elements_and_Compounds" },
          { name: "7. Chemistry in Everyday Life", file: "General_Awareness/Chemistry/Chemistry_in_Everyday_Life" },
          { name: "8. Chemicals in Agriculture", file: "General_Awareness/Chemistry/Chemicals_in_Agriculture" },
          { name: "9. Classification of Elements", file: "General_Awareness/Chemistry/Classification_of_Elements" },
          { name: "10. Chemical Reactions & Equation", file: "General_Awareness/Chemistry/Chemical_Reactions_and_Equation" },
          { name: "11. Matter & Its Nature", file: "General_Awareness/Chemistry/Matter_and_Its_Nature" },
          { name: "12. Chemical Bonding", file: "General_Awareness/Chemistry/Chemical_Bonding" },
          { name: "13. Properties of Gases", file: "General_Awareness/Chemistry/Properties_of_Gases" },
          { name: "14. Organic Chemistry", file: "General_Awareness/Chemistry/Organic_Chemistry" }
        ]
      },
      {
        name: "Biology",
        subtopics: [
          { name: "1. Biology Basics, Cell and Tissue", file: "General_Awareness/Biology/Biology_Basics_Cell_and_Tissue" },
          { name: "2. Skeletal, Nervous and Endocrine Systems", file: "General_Awareness/Biology/Skeletal_Nervous_and_Endocrine_Systems" },
          { name: "3. Blood, Heart, Digestion and Excretion", file: "General_Awareness/Biology/Blood_Heart_Digestion_and_Excretion" },
          { name: "4. Vitamins, Reproduction and Plants", file: "General_Awareness/Biology/Vitamins_Reproduction_and_Plants" },
          { name: "5. Classification, Micro-organisms and Diseases", file: "General_Awareness/Biology/Classification_Microorganisms_and_Diseases" }
        ]
      },
      {
        name: "Environment",
        subtopics: [
          { name: "1. Basics of Environmental Sciences", file: "General_Awareness/Environment/Basics_of_Environmental_Sciences" },
          { name: "2. Ecosystem", file: "General_Awareness/Environment/Ecosystem" },
          { name: "3. Trophic Dynamics and Energy Transfer", file: "General_Awareness/Environment/Trophic_Dynamics_and_Energy_Transfer" },
          { name: "4. Biogeochemical Cycles", file: "General_Awareness/Environment/Biogeochemical_Cycles" },
          { name: "5. Environmental Conventions", file: "General_Awareness/Environment/Environmental_Conventions" }
        ]
      },
      {
        name: "Static GK",
        subtopics: [
          { name: "1. Classical Dance", file: "General_Awareness/Static_GK/Classical_Dance" },
          { name: "2. Folk Dances of India", file: "General_Awareness/Static_GK/Folk_Dances_of_India" },
          { name: "3. Census", file: "General_Awareness/Static_GK/Census" },
          { name: "4. Musical Instruments", file: "General_Awareness/Static_GK/Musical_Instruments" },
          { name: "5. Gharanas", file: "General_Awareness/Static_GK/Gharanas" },
          { name: "6. Important Days", file: "General_Awareness/Static_GK/Important_Days" },
          { name: "7. Books and Authors", file: "General_Awareness/Static_GK/Books_and_Authors" },
          { name: "8. Sports", file: "General_Awareness/Static_GK/Sports" },
          { name: "9. International Organisations", file: "General_Awareness/Static_GK/International_Organisations" },
          { name: "10. National Organisations", file: "General_Awareness/Static_GK/National_Organisations" },
          { name: "11. Festivals of India", file: "General_Awareness/Static_GK/Festivals_of_India" },
          { name: "12. Government Schemes", file: "General_Awareness/Static_GK/Government_Schemes" },
          { name: "13. Awards and Honours", file: "General_Awareness/Static_GK/Awards_and_Honours" }
        ]
      }
    ]
  },
  {
    title: "English Comprehension",
    colorClass: "English_Comprehension",
    topics: [
      {
        name: "Vocabulary",
        subtopics: [
          { name: "Set 1", file: "English_Comprehension/Vocabulary/Set_1" },
          { name: "Set 2", file: "English_Comprehension/Vocabulary/Set_2" },
          { name: "Set 3", file: "English_Comprehension/Vocabulary/Set_3" }
        ]
      }
    ]
  }
];
