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
        name: "Ancient History",
        subtopics: [
          { name: "1. Stone Age", file: "General_Awareness/Ancient_History/Stone_Age" },
          { name: "2. Indus Valley Civilization", file: "General_Awareness/Ancient_History/Indus_Valley_Civilization" },
          { name: "3. Vedic Age", file: "General_Awareness/Ancient_History/Vedic_Age" },
          { name: "4. Jainism and Buddhism", file: "General_Awareness/Ancient_History/Jainism_and_Buddhism" },
          { name: "5. Mahajanapadas", file: "General_Awareness/Ancient_History/Mahajanapadas" },
          { name: "6. Maurya Dynasty", file: "General_Awareness/Ancient_History/Maurya_Dynasty" },
          { name: "7. Post-Maurya Dynasties", file: "General_Awareness/Ancient_History/Post_Maurya_Dynasties" },
          { name: "8. Gupta Dynasty", file: "General_Awareness/Ancient_History/Gupta_Dynasty" },
          { name: "9. Post-Gupta Dynasties", file: "General_Awareness/Ancient_History/Post_Gupta_Dynasties" },
          { name: "10. Sangam Age", file: "General_Awareness/Ancient_History/Sangam_Age" },
          { name: "11. Tripartite Struggle and Cholas", file: "General_Awareness/Ancient_History/Tripartite_Struggle_and_Cholas" }
        ]
      },
      {
        name: "Medieval History",
        subtopics: [
          { name: "1. Delhi Sultanate", file: "General_Awareness/Medieval_History/Delhi_Sultanate" },
          { name: "2. Vijayanagara and Bahmani Kingdom", file: "General_Awareness/Medieval_History/Vijayanagara_and_Bahmani_Kingdom" },
          { name: "3. Mughal Empire", file: "General_Awareness/Medieval_History/Mughal_Empire" },
          { name: "4. Marathas", file: "General_Awareness/Medieval_History/Marathas" },
          { name: "5. Bhakti and Sufi Movements", file: "General_Awareness/Medieval_History/Bhakti_and_Sufi_Movements" }
        ]
      },
      {
        name: "Modern History",
        subtopics: [
          { name: "1. Advent of Europeans", file: "General_Awareness/Modern_History/Advent_of_Europeans" },
          { name: "2. Socio-Religious Reforms", file: "General_Awareness/Modern_History/Socio_Religious_Reforms" },
          { name: "3. Revolt of 1857", file: "General_Awareness/Modern_History/Revolt_of_1857" },
          { name: "4. Indian National Congress", file: "General_Awareness/Modern_History/Indian_National_Congress" },
          { name: "5. Bengal Partition", file: "General_Awareness/Modern_History/Bengal_Partition" },
          { name: "6. Gandhian Era", file: "General_Awareness/Modern_History/Gandhian_Era" },
          { name: "7. CDM and Simon Commission", file: "General_Awareness/Modern_History/CDM_and_Simon_Commission" },
          { name: "8. Quit India Movement", file: "General_Awareness/Modern_History/Quit_India_Movement" },
          { name: "9. Governor-General and Viceroy", file: "General_Awareness/Modern_History/Governor_General_and_Viceroy" }
        ]
      },
      {
        name: "Polity",
        subtopics: [
          { name: "1. Making of Constitution", file: "General_Awareness/Polity/Making_of_Constitution" },
          { name: "2. Salient Features of the Constitution", file: "General_Awareness/Polity/Salient_Features_of_the_Constitution" },
          { name: "3. Preamble", file: "General_Awareness/Polity/Preamble" },
          { name: "4. Part 1 and Part 2 of the Constitution", file: "General_Awareness/Polity/Part_1_and_Part_2_of_the_Constitution" },
          { name: "5. Fundamental Rights", file: "General_Awareness/Polity/Fundamental_Rights" },
          { name: "6. DPSP and Fundamental Duties", file: "General_Awareness/Polity/DPSP_and_Fundamental_Duties" },
          { name: "7. President and Vice President of India", file: "General_Awareness/Polity/President_and_Vice_President_of_India" },
          { name: "8. Prime Minister and Council of Ministers", file: "General_Awareness/Polity/Prime_Minister_and_Council_of_Ministers" },
          { name: "9. Parliament", file: "General_Awareness/Polity/Parliament" },
          { name: "10. State Legislature", file: "General_Awareness/Polity/State_Legislature" },
          { name: "11. Emergency and Constitutional Amendment", file: "General_Awareness/Polity/Emergency_and_Constitutional_Amendment" },
          { name: "12. Supreme Court and High Court", file: "General_Awareness/Polity/Supreme_Court_and_High_Court" },
          { name: "13. Local Government", file: "General_Awareness/Polity/Local_Government" },
          { name: "14. Constitutional and Non-Constitutional Bodies", file: "General_Awareness/Polity/Constitutional_and_Non_Constitutional_Bodies" },
          { name: "15. Important Acts", file: "General_Awareness/Polity/Important_Acts" },
          { name: "16. Sources of the Indian Constitution", file: "General_Awareness/Polity/Sources_of_the_Indian_Constitution" }
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
  }
];