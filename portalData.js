
const PORTAL_DATA = [
  {
    title: "Geography",
    colorClass: "Geography",
    topics: [{
      name: "Geography",
      subtopics: [
        { name: "Solar System", file: "Geography/Solar_System" },
        { name: "Longitude and Latitude", file: "Geography/Longitude_and_Latitude" },
        { name: "Earth's Interior and Plate Tectonics", file: "Geography/Earths_Interior_and_Plate_Tectonics" },
        { name: "Rocks, Continents and Ocean", file: "Geography/Rocks_Continents_and_Ocean" },
        { name: "Geomorphology and Landforms", file: "Geography/Geomorphology_and_Landforms" },
        { name: "Atmosphere", file: "Geography/Atmosphere" },
        { name: "Wind, Ocean Current and Cyclone", file: "Geography/Wind_Ocean_Current_and_Cyclone" },
        { name: "India and Its Location", file: "Geography/India_and_Its_Location" },
        { name: "Himalayas", file: "Geography/Himalayas" },
        { name: "Peninsular Plateaus", file: "Geography/Peninsular_Plateaus" },
        { name: "Northern Plain and Islands", file: "Geography/Northern_Plain_and_Islands" },
        { name: "Himalayan River System", file: "Geography/Himalayan_River_System" },
        { name: "Peninsular Rivers", file: "Geography/Peninsular_Rivers" },
        { name: "Dams, Lakes and Waterfall", file: "Geography/Dams_Lakes_and_Waterfall" },
        { name: "Monsoon", file: "Geography/Monsoon" },
        { name: "Forest and Grassland", file: "Geography/Forest_and_Grassland" },
        { name: "Soil and Agriculture", file: "Geography/Soil_and_Agriculture" },
        { name: "Minerals", file: "Geography/Minerals" },
        { name: "World Map", file: "Geography/World_Map" },
        { name: "National Parks", file: "Geography/National_Parks" },
        { name: "Transport", file: "Geography/Transport" }
      ]
    }]
  },
  {
    title: "Ancient History",
    colorClass: "Ancient_History",
    topics: [{
      name: "Ancient History",
      subtopics: [
        { name: "Stone Age", file: "Ancient_History/Stone_Age" },
        { name: "Indus Valley Civilization", file: "Ancient_History/Indus_Valley_Civilization" },
        { name: "Vedic Age", file: "Ancient_History/Vedic_Age" },
        { name: "Jainism and Buddhism", file: "Ancient_History/Jainism_and_Buddhism" },
        { name: "Mahajanapadas", file: "Ancient_History/Mahajanapadas" },
        { name: "Maurya Dynasty", file: "Ancient_History/Maurya_Dynasty" },
        { name: "Post-Maurya Dynasties", file: "Ancient_History/Post_Maurya_Dynasties" },
        { name: "Gupta Dynasty", file: "Ancient_History/Gupta_Dynasty" },
        { name: "Post-Gupta Dynasties", file: "Ancient_History/Post_Gupta_Dynasties" },
        { name: "Sangam Age", file: "Ancient_History/Sangam_Age" },
        { name: "Tripartite Struggle and Cholas", file: "Ancient_History/Tripartite_Struggle_and_Cholas" }
      ]
    }]
  },
  {
    title: "Medieval History",
    colorClass: "Medieval_History",
    topics: [{
      name: "Medieval History",
      subtopics: [
        { name: "Delhi Sultanate", file: "Medieval_History/Delhi_Sultanate" },
        { name: "Vijayanagara and Bahmani Kingdom", file: "Medieval_History/Vijayanagara_and_Bahmani_Kingdom" },
        { name: "Mughal Empire", file: "Medieval_History/Mughal_Empire" },
        { name: "Marathas", file: "Medieval_History/Marathas" },
        { name: "Bhakti and Sufi Movements", file: "Medieval_History/Bhakti_and_Sufi_Movements" }
      ]
    }]
  },
  {
    title: "Modern History",
    colorClass: "Modern_History",
    topics: [{
      name: "Modern History",
      subtopics: [
        { name: "Advent of Europeans", file: "Modern_History/Advent_of_Europeans" },
        { name: "Socio-Religious Reforms", file: "Modern_History/Socio_Religious_Reforms" },
        { name: "Revolt of 1857", file: "Modern_History/Revolt_of_1857" },
        { name: "Indian National Congress", file: "Modern_History/Indian_National_Congress" },
        { name: "Bengal Partition", file: "Modern_History/Bengal_Partition" },
        { name: "Gandhian Era", file: "Modern_History/Gandhian_Era" },
        { name: "CDM and Simon Commission", file: "Modern_History/CDM_and_Simon_Commission" },
        { name: "Quit India Movement", file: "Modern_History/Quit_India_Movement" },
        { name: "Governor-General and Viceroy", file: "Modern_History/Governor_General_and_Viceroy" }
      ]
    }]
  },
  {
    title: "Polity",
    colorClass: "Polity",
    topics: [{
      name: "Polity",
      subtopics: [
        { name: "Making of Constitution", file: "Polity/Making_of_Constitution" },
        { name: "Salient Features of the Constitution", file: "Polity/Salient_Features_of_the_Constitution" },
        { name: "Preamble", file: "Polity/Preamble" },
        { name: "Part 1 and Part 2 of the Constitution", file: "Polity/Part_1_and_Part_2_of_the_Constitution" },
        { name: "Fundamental Rights", file: "Polity/Fundamental_Rights" },
        { name: "DPSP and Fundamental Duties", file: "Polity/DPSP_and_Fundamental_Duties" },
        { name: "President and Vice President of India", file: "Polity/President_and_Vice_President_of_India" },
        { name: "Prime Minister and Council of Ministers", file: "Polity/Prime_Minister_and_Council_of_Ministers" },
        { name: "Parliament", file: "Polity/Parliament" },
        { name: "State Legislature", file: "Polity/State_Legislature" },
        { name: "Emergency and Constitutional Amendment", file: "Polity/Emergency_and_Constitutional_Amendment" },
        { name: "Supreme Court and High Court", file: "Polity/Supreme_Court_and_High_Court" },
        { name: "Local Government", file: "Polity/Local_Government" },
        { name: "Constitutional and Non-Constitutional Bodies", file: "Polity/Constitutional_and_Non_Constitutional_Bodies" },
        { name: "Important Acts", file: "Polity/Important_Acts" },
        { name: "Sources of the Indian Constitution", file: "Polity/Sources_of_the_Indian_Constitution" }
      ]
    }]
  },
  {
    title: "Economics",
    colorClass: "Economics",
    topics: [{
      name: "Economics",
      subtopics: [
        { name: "Basics of Economy", file: "Economics/Basics_of_Economy" },
        { name: "Demand and Supply", file: "Economics/Demand_and_Supply" },
        { name: "National Income", file: "Economics/National_Income" },
        { name: "Inflation and Unemployment", file: "Economics/Inflation_and_Unemployment" },
        { name: "Budget and Taxation", file: "Economics/Budget_and_Taxation" },
        { name: "Monetary Policy", file: "Economics/Monetary_Policy" },
        { name: "Money and Banking", file: "Economics/Money_and_Banking" },
        { name: "Balance of Payment and Poverty", file: "Economics/Balance_of_Payment_and_Poverty" },
        { name: "Five Year Plan and Industrial Policy Resolution", file: "Economics/Five_Year_Plan_and_Industrial_Policy_Resolution" }
      ]
    }]
  },
  {
    title: "Physics",
    colorClass: "Physics",
    topics: [{
      name: "Physics",
      subtopics: [
        { name: "Motion", file: "Physics/Motion" },
        { name: "Force and Laws of Motion", file: "Physics/Force_and_Laws_of_Motion" },
        { name: "Gravitation and Work Done", file: "Physics/Gravitation_and_Work_Done" },
        { name: "Sound", file: "Physics/Sound" },
        { name: "Reflection and Refraction", file: "Physics/Reflection_and_Refraction" },
        { name: "Human Eye and Vision", file: "Physics/Human_Eye_and_Vision" },
        { name: "Electricity", file: "Physics/Electricity" },
        { name: "Magnetic Effect of Electric Current", file: "Physics/Magnetic_Effect_of_Electric_Current" }
      ]
    }]
  },
  {
    title: "Chemistry",
    colorClass: "Chemistry",
    topics: [{
      name: "Chemistry",
      subtopics: [
        { name: "Matter", file: "Chemistry/Matter" },
        { name: "Atom and Its Structure", file: "Chemistry/Atom_and_Its_Structure" },
        { name: "Periodic Table", file: "Chemistry/Periodic_Table" },
        { name: "Chemical Reactions", file: "Chemistry/Chemical_Reactions" },
        { name: "Metals and Non-Metals", file: "Chemistry/Metals_and_Non_Metals" },
        { name: "Acid, Base and Salt", file: "Chemistry/Acid_Base_and_Salt" },
        { name: "Carbon and Its Compounds", file: "Chemistry/Carbon_and_Its_Compounds" }
      ]
    }]
  },
  {
    title: "Biology",
    colorClass: "Biology",
    topics: [{
      name: "Biology",
      subtopics: [
        { name: "Cell", file: "Biology/Cell" },
        { name: "Plant Tissue and Animal Tissue", file: "Biology/Plant_Tissue_and_Animal_Tissue" },
        { name: "Plant and Animal Kingdom", file: "Biology/Plant_and_Animal_Kingdom" },
        { name: "Nervous System", file: "Biology/Nervous_System" },
        { name: "Hormones and Plant Movements", file: "Biology/Hormones_and_Plant_Movements" },
        { name: "Reproduction", file: "Biology/Reproduction" },
        { name: "Digestion and Respiration", file: "Biology/Digestion_and_Respiration" },
        { name: "Circulatory System and Excretory System", file: "Biology/Circulatory_System_and_Excretory_System" },
        { name: "Diseases", file: "Biology/Diseases" },
        { name: "Nutrients", file: "Biology/Nutrients" },
        { name: "Hereditary and Evolution", file: "Biology/Hereditary_and_Evolution" }
      ]
    }]
  },
  {
    title: "Environment",
    colorClass: "Environment",
    topics: [{
      name: "Environment",
      subtopics: [
        { name: "Basics of Environmental Sciences", file: "Environment/Basics_of_Environmental_Sciences" },
        { name: "Ecosystem", file: "Environment/Ecosystem" },
        { name: "Trophic Dynamics and Energy Transfer", file: "Environment/Trophic_Dynamics_and_Energy_Transfer" },
        { name: "Biogeochemical Cycles", file: "Environment/Biogeochemical_Cycles" },
        { name: "Environmental Conventions", file: "Environment/Environmental_Conventions" }
      ]
    }]
  },
  {
    title: "Static GK",
    colorClass: "Static_GK",
    topics: [{
      name: "Static GK",
      subtopics: [
        { name: "Classical Dance", file: "Static_GK/Classical_Dance" },
        { name: "Folk Dances of India", file: "Static_GK/Folk_Dances_of_India" },
        { name: "Census", file: "Static_GK/Census" },
        { name: "Musical Instruments", file: "Static_GK/Musical_Instruments" },
        { name: "Gharanas", file: "Static_GK/Gharanas" },
        { name: "Important Days", file: "Static_GK/Important_Days" },
        { name: "Books and Authors", file: "Static_GK/Books_and_Authors" },
        { name: "Sports", file: "Static_GK/Sports" },
        { name: "International Organisations", file: "Static_GK/International_Organisations" },
        { name: "National Organisations", file: "Static_GK/National_Organisations" },
        { name: "Festivals of India", file: "Static_GK/Festivals_of_India" },
        { name: "Government Schemes", file: "Static_GK/Government_Schemes" },
        { name: "Awards and Honours", file: "Static_GK/Awards_and_Honours" }
      ]
    }]
  }
];
