const PORTAL_DATA = [
  {
    title: "General Awareness",
    colorClass: "General_Awareness",
    topics: [
      {
        name: "Geography",
        subtopics: [
          { name: "1. Solar System", file: "General_Awareness/Geography/Solar_System" },
          { name: "2. Longitude and Latitude", file: "General_Awareness/Geography/Longitude_and_Latitude" },
          { name: "3. Earth's Interior and Plate Tectonics", file: "General_Awareness/Geography/Earths_Interior_and_Plate_Tectonics" },
          { name: "4. Rocks, Continents and Ocean", file: "General_Awareness/Geography/Rocks_Continents_and_Ocean" },
          { name: "5. Geomorphology and Landforms", file: "General_Awareness/Geography/Geomorphology_and_Landforms" },
          { name: "6. Atmosphere", file: "General_Awareness/Geography/Atmosphere" },
          { name: "7. Wind, Ocean Current and Cyclone", file: "General_Awareness/Geography/Wind_Ocean_Current_and_Cyclone" },
          { name: "8. India and Its Location", file: "General_Awareness/Geography/India_and_Its_Location" },
          { name: "9. Himalayas", file: "General_Awareness/Geography/Himalayas" },
          { name: "10. Peninsular Plateaus", file: "General_Awareness/Geography/Peninsular_Plateaus" },
          { name: "11. Northern Plain and Islands", file: "General_Awareness/Geography/Northern_Plain_and_Islands" },
          { name: "12. Himalayan River System", file: "General_Awareness/Geography/Himalayan_River_System" },
          { name: "13. Peninsular Rivers", file: "General_Awareness/Geography/Peninsular_Rivers" },
          { name: "14. Dams, Lakes and Waterfall", file: "General_Awareness/Geography/Dams_Lakes_and_Waterfall" },
          { name: "15. Monsoon", file: "General_Awareness/Geography/Monsoon" },
          { name: "16. Forest and Grassland", file: "General_Awareness/Geography/Forest_and_Grassland" },
          { name: "17. Soil and Agriculture", file: "General_Awareness/Geography/Soil_and_Agriculture" },
          { name: "18. Minerals", file: "General_Awareness/Geography/Minerals" },
          { name: "19. World Map", file: "General_Awareness/Geography/World_Map" },
          { name: "20. National Parks", file: "General_Awareness/Geography/National_Parks" },
          { name: "21. Transport", file: "General_Awareness/Geography/Transport" }
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
          { name: "1. Basics of Economy", file: "General_Awareness/Economics/Basics_of_Economy" },
          { name: "2. Demand and Supply", file: "General_Awareness/Economics/Demand_and_Supply" },
          { name: "3. National Income", file: "General_Awareness/Economics/National_Income" },
          { name: "4. Inflation and Unemployment", file: "General_Awareness/Economics/Inflation_and_Unemployment" },
          { name: "5. Budget and Taxation", file: "General_Awareness/Economics/Budget_and_Taxation" },
          { name: "6. Monetary Policy", file: "General_Awareness/Economics/Monetary_Policy" },
          { name: "7. Money and Banking", file: "General_Awareness/Economics/Money_and_Banking" },
          { name: "8. Balance of Payment and Poverty", file: "General_Awareness/Economics/Balance_of_Payment_and_Poverty" },
          { name: "9. Five Year Plan and Industrial Policy Resolution", file: "General_Awareness/Economics/Five_Year_Plan_and_Industrial_Policy_Resolution" }
        ]
      },
      {
        name: "Physics",
        subtopics: [
          { name: "1. Motion", file: "General_Awareness/Physics/Motion" },
          { name: "2. Force and Laws of Motion", file: "General_Awareness/Physics/Force_and_Laws_of_Motion" },
          { name: "3. Gravitation and Work Done", file: "General_Awareness/Physics/Gravitation_and_Work_Done" },
          { name: "4. Sound", file: "General_Awareness/Physics/Sound" },
          { name: "5. Reflection and Refraction", file: "General_Awareness/Physics/Reflection_and_Refraction" },
          { name: "6. Human Eye and Vision", file: "General_Awareness/Physics/Human_Eye_and_Vision" },
          { name: "7. Electricity", file: "General_Awareness/Physics/Electricity" },
          { name: "8. Magnetic Effect of Electric Current", file: "General_Awareness/Physics/Magnetic_Effect_of_Electric_Current" }
        ]
      },
      {
        name: "Chemistry",
        subtopics: [
          { name: "1. Matter", file: "General_Awareness/Chemistry/Matter" },
          { name: "2. Atom and Its Structure", file: "General_Awareness/Chemistry/Atom_and_Its_Structure" },
          { name: "3. Periodic Table", file: "General_Awareness/Chemistry/Periodic_Table" },
          { name: "4. Chemical Reactions", file: "General_Awareness/Chemistry/Chemical_Reactions" },
          { name: "5. Metals and Non-Metals", file: "General_Awareness/Chemistry/Metals_and_Non_Metals" },
          { name: "6. Acid, Base and Salt", file: "General_Awareness/Chemistry/Acid_Base_and_Salt" },
          { name: "7. Carbon and Its Compounds", file: "General_Awareness/Chemistry/Carbon_and_Its_Compounds" }
        ]
      },
      {
        name: "Biology",
        subtopics: [
          { name: "1. Cell", file: "General_Awareness/Biology/Cell" },
          { name: "2. Plant Tissue and Animal Tissue", file: "General_Awareness/Biology/Plant_Tissue_and_Animal_Tissue" },
          { name: "3. Plant and Animal Kingdom", file: "General_Awareness/Biology/Plant_and_Animal_Kingdom" },
          { name: "4. Nervous System", file: "General_Awareness/Biology/Nervous_System" },
          { name: "5. Hormones and Plant Movements", file: "General_Awareness/Biology/Hormones_and_Plant_Movements" },
          { name: "6. Reproduction", file: "General_Awareness/Biology/Reproduction" },
          { name: "7. Digestion and Respiration", file: "General_Awareness/Biology/Digestion_and_Respiration" },
          { name: "8. Circulatory System and Excretory System", file: "General_Awareness/Biology/Circulatory_System_and_Excretory_System" },
          { name: "9. Diseases", file: "General_Awareness/Biology/Diseases" },
          { name: "10. Nutrients", file: "General_Awareness/Biology/Nutrients" },
          { name: "11. Hereditary and Evolution", file: "General_Awareness/Biology/Hereditary_and_Evolution" }
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