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
          { name: "1. Motion, Force & Energy", file: "General_Awareness/Physics/Motion_Force_and_Energy" },
          { name: "2. Oscillations, Waves & Sound", file: "General_Awareness/Physics/Oscillations_Waves_and_Sound" },
          { name: "3. Heat & Thermodynamics", file: "General_Awareness/Physics/Heat_and_Thermodynamics" },
          { name: "4. Properties of Matter & Gravitation", file: "General_Awareness/Physics/Properties_of_Matter_and_Gravitation" },
          { name: "5. Light, Electricity, Magnetism & Nuclear Reactor", file: "General_Awareness/Physics/Light_Electricity_Magnetism_and_Nuclear_Reactor" }
        ]
      },
      {
        name: "Chemistry",
        subtopics: [
          { name: "1. Matter, Acids, Bases, Salts", file: "General_Awareness/Chemistry/Matter_Acids_Bases_Salts" },
          { name: "2. Atom and Common Elements", file: "General_Awareness/Chemistry/Atom_and_Common_Elements" },
          { name: "3. Everyday Materials and Polymers", file: "General_Awareness/Chemistry/Everyday_Materials_Polymers" },
          { name: "4. Periodic Table, Reactions, Metals", file: "General_Awareness/Chemistry/Periodic_Table_Reactions_Metals" },
          { name: "5. Alloys, Bonding, Gases, Organic, Fuels", file: "General_Awareness/Chemistry/Alloys_Bonding_Gases_Organic_Fuels" }
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
          { name: "1. Basics of Environmental Science", file: "General_Awareness/Environment/Basics_of_Environmental_Science" },
          { name: "2. Pollution", file: "General_Awareness/Environment/Pollution" },
          { name: "3. Greenhouse Effect, Ozone Layer and Protocols", file: "General_Awareness/Environment/Greenhouse_Ozone_and_Protocols" },
          { name: "4. Important One-Liners", file: "General_Awareness/Environment/Important_One_Liners" }
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
          { name: "7. Festivals of India", file: "General_Awareness/Static_GK/Festivals_of_India" }
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