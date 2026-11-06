const PORTAL_DATA = [
  {
    title: "Indian History",
    colorClass: "Indian_History",
    topics: [
      {
        name: "Introduction",
        subtopics: [
          { name: "Introduction", file: "Indian_History/Introduction_Introduction" }
        ]
      },
      {
        name: "Ancient India",
        subtopics: [
          { name: "Historical Sources", file: "Indian_History/Ancient_India_Historical_Sources" },
          { name: "Pre-Historic Period", file: "Indian_History/Ancient_India_Pre_Historic_Period" },
          { name: "Harappan/Indus Civilization", file: "Indian_History/Ancient_India_Harappan_Indus_Civilization" },
          { name: "Vedic Culture", file: "Indian_History/Ancient_India_Vedic_Culture" },
          { name: "Mahajanapada Period", file: "Indian_History/Ancient_India_Mahajanapada_Period" },
          { name: "Religious Movements", file: "Indian_History/Ancient_India_Religious_Movements" },
          { name: "Maurya Period", file: "Indian_History/Ancient_India_Maurya_Period" },
          { name: "Post Maurya/Pre-Gupta Period", file: "Indian_History/Ancient_India_Post_Maurya_Pre_Gupta_Period" },
          { name: "The Sangam Period", file: "Indian_History/Ancient_India_The_Sangam_Period" },
          { name: "Gupta Period", file: "Indian_History/Ancient_India_Gupta_Period" },
          { name: "Post-Gupta Period/Vardhana Dynasty", file: "Indian_History/Ancient_India_Post_Gupta_Period_Vardhana_Dynasty" }
        ]
      },
      {
        name: "Medieval India",
        subtopics: [
          { name: "Early-Medieval Period: North India (Rajputa Period)", file: "Indian_History/Medieval_India_Early_Medieval_Period_North_India_Rajputa_Period" },
          { name: "Early-Medieval Period: South India (Cholas & Others)", file: "Indian_History/Medieval_India_Early_Medieval_Period_South_India_Cholas_Others" },
          { name: "Sultanate Period: The Delhi Sultanate", file: "Indian_History/Medieval_India_Sultanate_Period_The_Delhi_Sultanate" },
          { name: "Sultanate Period: Vijayanagar & Other Kingdoms", file: "Indian_History/Medieval_India_Sultanate_Period_Vijayanagar_Other_Kingdoms" },
          { name: "Religious Movements: Bhakti Movement", file: "Indian_History/Medieval_India_Religious_Movements_Bhakti_Movement" },
          { name: "Religious Movements: Sufi Movement", file: "Indian_History/Medieval_India_Religious_Movements_Sufi_Movement" },
          { name: "Mughal Period", file: "Indian_History/Medieval_India_Mughal_Period" },
          { name: "Maratha State & Maratha Confederacy", file: "Indian_History/Medieval_India_Maratha_State_Maratha_Confederacy" },
          { name: "The Advent of the Europeans", file: "Indian_History/Medieval_India_The_Advent_of_the_Europeans" }
        ]
      },
      {
        name: "Modern India",
        subtopics: [
          { name: "Expansion of British Power (Bengal, Mysore, Punjab etc.)", file: "Indian_History/Modern_India_Expansion_of_British_Power_Bengal_Mysore_Punjab_etc" },
          { name: "Economic Impact of British Rule", file: "Indian_History/Modern_India_Economic_Impact_of_British_Rule" },
          { name: "Socio-Religious Movements in 19th-20th Centuries", file: "Indian_History/Modern_India_Socio_Religious_Movements_in_19th_20th_Centuries" },
          { name: "Freedom Struggle: The Revolt of 1857", file: "Indian_History/Modern_India_Freedom_Struggle_The_Revolt_of_1857" },
          { name: "Freedom Struggle: Moderate Phase", file: "Indian_History/Modern_India_Freedom_Struggle_Moderate_Phase" },
          { name: "Freedom Struggle: Extremist Phase", file: "Indian_History/Modern_India_Freedom_Struggle_Extremist_Phase" },
          { name: "Freedom Struggle: The Gandhian Era", file: "Indian_History/Modern_India_Freedom_Struggle_The_Gandhian_Era" }
        ]
      },
      {
        name: "Miscellaneous (History)",
        subtopics: [
          { name: "Important Dates", file: "Indian_History/Miscellaneous_History_Important_Dates" },
          { name: "Important Places", file: "Indian_History/Miscellaneous_History_Important_Places" },
          { name: "Important Foreign Travellers/Envoys", file: "Indian_History/Miscellaneous_History_Important_Foreign_Travellers_Envoys" },
          { name: "Abbreviated or Alternative Names", file: "Indian_History/Miscellaneous_History_Abbreviated_or_Alternative_Names" },
          { name: "Important Sayings", file: "Indian_History/Miscellaneous_History_Important_Sayings" },
          { name: "Important Battles", file: "Indian_History/Miscellaneous_History_Important_Battles" },
          { name: "Reforms/Acts", file: "Indian_History/Miscellaneous_History_Reforms_Acts" },
          { name: "Educational Committees/Commissions", file: "Indian_History/Miscellaneous_History_Educational_Committees_Commissions" },
          { name: "Economic Committees/Commissions", file: "Indian_History/Miscellaneous_History_Economic_Committees_Commissions" },
          { name: "Administrative Committees/Commissions", file: "Indian_History/Miscellaneous_History_Administrative_Committees_Commissions" },
          { name: "Important Congress Session", file: "Indian_History/Miscellaneous_History_Important_Congress_Session" },
          { name: "Governor-Generals & Viceroys", file: "Indian_History/Miscellaneous_History_Governor_Generals_Viceroys" }
        ]
      }
    ]
  },

  {
    title: "World History",
    colorClass: "World_History",
    topics: [
      {
        name: "Ancient World",
        subtopics: [
          { name: "Mesopotamian Civilization", file: "World_History/Ancient_World_Mesopotamian_Civilization" },
          { name: "Egyptian Civilization", file: "World_History/Ancient_World_Egyptian_Civilization" },
          { name: "Harappan Civilization", file: "World_History/Ancient_World_Harappan_Civilization" },
          { name: "Chinese Civilization", file: "World_History/Ancient_World_Chinese_Civilization" },
          { name: "Iranian Civilization", file: "World_History/Ancient_World_Iranian_Civilization" },
          { name: "Greek Civilization", file: "World_History/Ancient_World_Greek_Civilization" },
          { name: "Roman Civilization", file: "World_History/Ancient_World_Roman_Civilization" }
        ]
      },
      {
        name: "Medieval World",
        subtopics: [
          { name: "Medieval Europe", file: "World_History/Medieval_World_Medieval_Europe" },
          { name: "Feudalism", file: "World_History/Medieval_World_Feudalism" },
          { name: "Crusades", file: "World_History/Medieval_World_Crusades" },
          { name: "Arab Civilization", file: "World_History/Medieval_World_Arab_Civilization" },
          { name: "Medieval China", file: "World_History/Medieval_World_Medieval_China" },
          { name: "Medieval Japan", file: "World_History/Medieval_World_Medieval_Japan" },
          { name: "Seven Wonders of Medieval World", file: "World_History/Medieval_World_Seven_Wonders_of_Medieval_World" }
        ]
      },
      {
        name: "Modern World",
        subtopics: [
          { name: "Renaissance", file: "World_History/Modern_World_Renaissance" },
          { name: "Reformation", file: "World_History/Modern_World_Reformation" },
          { name: "Geographical Discoveries", file: "World_History/Modern_World_Geographical_Discoveries" },
          { name: "Glorious Revolution", file: "World_History/Modern_World_Glorious_Revolution" },
          { name: "Industrial Revolution", file: "World_History/Modern_World_Industrial_Revolution" },
          { name: "American Revolution", file: "World_History/Modern_World_American_Revolution" },
          { name: "French Revolution", file: "World_History/Modern_World_French_Revolution" },
          { name: "Unification of Italy", file: "World_History/Modern_World_Unification_of_Italy" },
          { name: "Unification of Germany", file: "World_History/Modern_World_Unification_of_Germany" },
          { name: "First World War", file: "World_History/Modern_World_First_World_War" },
          { name: "Russian Revolution", file: "World_History/Modern_World_Russian_Revolution" },
          { name: "Chinese Revolution", file: "World_History/Modern_World_Chinese_Revolution" },
          { name: "Turkish Revolution", file: "World_History/Modern_World_Turkish_Revolution" },
          { name: "Economic Depression of the World: 1929-34", file: "World_History/Modern_World_Economic_Depression_of_the_World_1929_34" },
          { name: "Fascism in Italy", file: "World_History/Modern_World_Fascism_in_Italy" },
          { name: "Nazism in Germany", file: "World_History/Modern_World_Nazism_in_Germany" },
          { name: "Militarism in Japan", file: "World_History/Modern_World_Militarism_in_Japan" },
          { name: "Second World War", file: "World_History/Modern_World_Second_World_War" }
        ]
      },
      {
        name: "Miscellaneous (World History)",
        subtopics: [
          { name: "Important Dates", file: "World_History/Miscellaneous_World_History_Important_Dates" },
          { name: "Association of Places", file: "World_History/Miscellaneous_World_History_Association_of_Places" },
          { name: "Abbreviated or Alternative Names", file: "World_History/Miscellaneous_World_History_Abbreviated_or_Alternative_Names" },
          { name: "Important Battles", file: "World_History/Miscellaneous_World_History_Important_Battles" }
        ]
      }
    ]
  },

  {
    title: "Geography",
    colorClass: "Geography",
    topics: [
      {
        name: "Geography",
        subtopics: [
  { name: "Universe, Solar System and Space Exploration", file: "Geography/Universe_Solar_System_and_Space_Exploration" },
  // Merged: Highlights, Indian's Contribution in Geography, Universe, Galaxy, The Big Bang Theory, Higgs Boson, Star, The Solar System, Heliocentrism, Geocentric Model, Members of the Solar System, Aditya-L1, The Planets, Classification of Planets, Some Notable Facts About Various Planets and Satellites, Super Moon, Blue Moon, Chandrayaan 1-2-3, Some Facts and Figures about the Planets, Some well known Constellations.

  { name: "Earth, Geological Structure and Geomorphic Processes", file: "Geography/Earth_Geological_Structure_and_Geomorphic_Processes" },
  // Merged: The Earth: Shape and Size, Internal Structure of the Earth, Rocks, Earthquakes and Volcanoes, World Distribution of Volcanoes, Mountains, Plateaus, Plains, Islands, Land Forms created by River System, the actions of Wind, the actions of Groundwater, the actions of Sea Waves.

  { name: "Latitude, Longitude, Time Zones and Earth's Movements", file: "Geography/Latitude_Longitude_Time_Zones_and_Earths_Movements" },
  // Merged: Latitude and Longitude, Local Time and Time Zones, The Date Line and Universal Time, Indian Standard Time (IST), Lines crossing different countries, Earth and its Relation with the Sun, Coriolis Effect, Solstice, Equinoxes, Midnight Sun, Eclipses.

  { name: "Atmosphere, Weather, Climate and Oceanography", file: "Geography/Atmosphere_Weather_Climate_and_Oceanography" },
  // Merged: Atmosphere, Layers of the Atmosphere, How The Sun Creates Energy, Weather and Climate, Humidity, Atmospheric Pressure, Winds, Clouds, Rain Fall, Oceans on the Earth, Pacific and Atlantic Ocean Currents, Indian Ocean Currents, Hydrosphere.

  { name: "World Physical Geography and Major Landforms", file: "Geography/World_Physical_Geography_and_Major_Landforms" },
  // Merged: Continents of the World, Biosphere, Lithosphere, Major Mountain Peaks (World), Three Deepest Oceans, Major Waterfalls, Major Lakes, Major Islands, Major Deserts, Major Canals, Major Dams (World), Top 10 Countries with Largest Aquatic Area, Top 10 Countries with Longest Coastline.

  { name: "India: Location, Physical Features and Drainage Systems", file: "Geography/India_Location_Physical_Features_and_Drainage_Systems" },
  // Merged: The Indian Sub-Continent: Position, Extent and Physical Features, Division of Himalayas, Major Passes of India, The Coastal Plains, The Drainage System of India, The River Systems of the Himalayan Drainage, The Peninsular Drainage System, Major Water Channels of India, Revised Length of the Coastline of India.

  { name: "Indian Agriculture, Irrigation and Water Resources", file: "Geography/Indian_Agriculture_Irrigation_and_Water_Resources" },
  // Merged: Soil Resources of the Indian Sub-continent, Kinds of Farming, Agriculture in India, Important Crops and their Producers, Important Irrigation and Power Projects, Water Resources and Their Utilisation in India, Multipurpose River Valley Projects, Colour Revolutions in India.

  { name: "Indian Minerals, Industries, Energy and Transport", file: "Geography/Indian_Minerals_Industries_Energy_and_Transport" },
  // Merged: Minerals in India: Some Notable Facts, Major Industries of India, Transport in India, National Highways, Rail Transport, Civil Aviation, Maritime Transport, Major Ports and Non-Major Ports, Towns Associated with Important Industries (India), Important Minerals and their Producers, World's Manufacturing Industries.

  { name: "Indian Environment, Forests, Wildlife and Protected Areas", file: "Geography/Indian_Environment_Forests_Wildlife_and_Protected_Areas" },
  // Merged: Forests, India State of Forest Report - 2019, Wildlife Sanctuaries and National Parks in India, RAMSAR Wetland Sites, Project Tiger, Tiger Reserves in India, Protected Areas of India.

  { name: "Indian States, Cities, Borders and Important Places", file: "Geography/Indian_States_Cities_Borders_and_Important_Places" },
  // Merged: India facts and figures, State and UT's and their Capitals, Census, Top 10 Most Populous countries, Length of India's Border with the Neighbouring Countries, Cities at the Bank of River, Famous cities (India), New Changed Names (India), Indian States with Longest Border, International Land Border, Mount Everest, Wonders of the World, Famous Sites (India).

  { name: "World Political Geography, Important Places and Geographical Features", file: "Geography/World_Political_Geography_Important_Places_and_Features" },
  // Merged: Major Straits of the World (Connects / Separates), Important Discoveries, Major Canals, Major Waterfalls, Major Lakes, Major Islands, Major Deserts, Geographical Epithets, International Boundary Lines, Tribes and their Homeland, Map Lines, Land Locked Countries, Important Places in the World, Country, Capital and Currency, Famous Sites (World), Highest Mountain Peaks (World).

  { name: "Geographical Discoveries, Statistics, Reports and Miscellaneous", file: "Geography/Geographical_Discoveries_Statistics_Reports_and_Miscellaneous" }
  // Merged: Statistical Data of the Earth, India facts and figures, Census, Top 10 Most Populous countries, Important Discoveries, Wonders of the World, Top 10 Countries with Largest Aquatic Area, Top 10 Countries with Longest Coastline, Glossary of Geographical Terms, Miscellaneous.
]

      }
    ]
  },

  {
    title: "Environment",
    colorClass: "Environment",
    topics: [
      {
        name: "Environment",
        subtopics: [
          { name: "Introduction", file: "Environment/Introduction" },
          { name: "Lithosphere, Hydrosphere & Atmosphere", file: "Environment/Lithosphere_Hydrosphere_Atmosphere" },
          { name: "Ecology: Study/Science of Biosphere", file: "Environment/Ecology_Study_Science_of_Biosphere" },
          { name: "Biodiversity", file: "Environment/Biodiversity" },
          { name: "Environmental Issues/Problems & Their Management/Measures: Pollution, Biodiversity Loss & Climate Change", file: "Environment/Environmental_Issues_Problems_Their_Management_Measures_Pollution_Biodiversity_Loss_Climate_Change" },
          { name: "Miscellaneous", file: "Environment/Miscellaneous" }
        ]
      }
    ]
  },

  {
    title: "Indian Polity and Constitution",
    colorClass: "Indian_Polity_and_Constitution",
    topics: [
      {
        name: "Indian Polity and Constitution",
        subtopics: [
          { name: "Evolution of Indian Constitution", file: "Indian_Polity_and_Constitution/Evolution_of_Indian_Constitution" },
          { name: "Constituent Assembly and Making of the Constitution", file: "Indian_Polity_and_Constitution/Constituent_Assembly_and_Making_of_the_Constitution" },
          { name: "Different Sources of Indian Constitution", file: "Indian_Polity_and_Constitution/Different_Sources_of_Indian_Constitution" },
          { name: "Important Parts, Articles of the Constitution", file: "Indian_Polity_and_Constitution/Important_Parts_Articles_of_the_Constitution" },
          { name: "Schedules of Indian Constitution", file: "Indian_Polity_and_Constitution/Schedules_of_Indian_Constitution" },
          { name: "Special Features of Indian Constitution", file: "Indian_Polity_and_Constitution/Special_Features_of_Indian_Constitution" },
          { name: "The Writs", file: "Indian_Polity_and_Constitution/The_Writs" },
          { name: "Directive Principles of State Policy", file: "Indian_Polity_and_Constitution/Directive_Principles_of_State_Policy" },
          { name: "Fundamental Duties", file: "Indian_Polity_and_Constitution/Fundamental_Duties" },
          { name: "Procedure for Amending the Constitution", file: "Indian_Polity_and_Constitution/Procedure_for_Amending_the_Constitution" },
          { name: "The Doctrine of Basic Features", file: "Indian_Polity_and_Constitution/The_Doctrine_of_Basic_Features" },
          { name: "Some Important Constitutional Amendment Acts", file: "Indian_Polity_and_Constitution/Some_Important_Constitutional_Amendment_Acts" },
          { name: "Executive of the Union", file: "Indian_Polity_and_Constitution/Executive_of_the_Union" },
          { name: "Emergency Provisions", file: "Indian_Polity_and_Constitution/Emergency_Provisions" },
          { name: "The Vice-President", file: "Indian_Polity_and_Constitution/The_Vice_President" },
          { name: "The Prime Minister and The Union Council of Ministers", file: "Indian_Polity_and_Constitution/The_Prime_Minister_and_The_Union_Council_of_Ministers" },
          { name: "The Attorney-General for India", file: "Indian_Polity_and_Constitution/The_Attorney_General_for_India" },
          { name: "The Comptroller and Auditor General", file: "Indian_Polity_and_Constitution/The_Comptroller_and_Auditor_General" },
          { name: "The Parliament of India", file: "Indian_Polity_and_Constitution/The_Parliament_of_India" },
          { name: "Parliamentary Terms", file: "Indian_Polity_and_Constitution/Parliamentary_Terms" },
          { name: "The Supreme Court", file: "Indian_Polity_and_Constitution/The_Supreme_Court" },
          { name: "The High Court", file: "Indian_Polity_and_Constitution/The_High_Court" },
          { name: "Centre-State Relations", file: "Indian_Polity_and_Constitution/Centre_State_Relations" },
          { name: "Executive of the States", file: "Indian_Polity_and_Constitution/Executive_of_the_States" },
          { name: "Panchayati Raj", file: "Indian_Polity_and_Constitution/Panchayati_Raj" },
          { name: "Municipalities", file: "Indian_Polity_and_Constitution/Municipalities" },
          { name: "Inter-State Relations", file: "Indian_Polity_and_Constitution/Inter_State_Relations" },
          { name: "Planning Commission", file: "Indian_Polity_and_Constitution/Planning_Commission" },
          { name: "NITI Aayog", file: "Indian_Polity_and_Constitution/NITI_Aayog" },
          { name: "National Development Council (NDC)", file: "Indian_Polity_and_Constitution/National_Development_Council_NDC" },
          { name: "National Integration Council", file: "Indian_Polity_and_Constitution/National_Integration_Council" },
          { name: "Finance Commission", file: "Indian_Polity_and_Constitution/Finance_Commission" },
          { name: "Public Service Commissions", file: "Indian_Polity_and_Constitution/Public_Service_Commissions" },
          { name: "Election", file: "Indian_Polity_and_Constitution/Election" },
          { name: "Delimitation Commission of India", file: "Indian_Polity_and_Constitution/Delimitation_Commission_of_India" },
          { name: "The Official Languages", file: "Indian_Polity_and_Constitution/The_Official_Languages" },
          { name: "National Symbols", file: "Indian_Polity_and_Constitution/National_Symbols" },
          { name: "Some Important Comments", file: "Indian_Polity_and_Constitution/Some_Important_Comments" },
          { name: "Some Important Statements", file: "Indian_Polity_and_Constitution/Some_Important_Statements" },
          { name: "Some Important Definitions", file: "Indian_Polity_and_Constitution/Some_Important_Definitions" },
          { name: "Some Important Books (Polity)", file: "Indian_Polity_and_Constitution/Some_Important_Books_Polity" },
          { name: "Miscellaneous", file: "Indian_Polity_and_Constitution/Miscellaneous" }
        ]
      }
    ]
  },

  {
    title: "Indian Economy",
    colorClass: "Indian_Economy",
    topics: [
      {
        name: "Indian Economy",
        subtopics: [
          { name: "Highlights of Indian Economy", file: "Indian_Economy/Highlights_of_Indian_Economy" },
          { name: "Economy and Economics", file: "Indian_Economy/Economy_and_Economics" },
          { name: "Characteristics of Indian Economy", file: "Indian_Economy/Characteristics_of_Indian_Economy" },
          { name: "Agriculture and Allied Sector", file: "Indian_Economy/Agriculture_and_Allied_Sector" },
          { name: "National Income", file: "Indian_Economy/National_Income" },
          { name: "Economic Planning and Development", file: "Indian_Economy/Economic_Planning_and_Development" },
          { name: "Unemployment and Employment", file: "Indian_Economy/Unemployment_and_Employment" },
          { name: "New Economic Policy and Reforms", file: "Indian_Economy/New_Economic_Policy_and_Reforms" },
          { name: "Indian Financial System", file: "Indian_Economy/Indian_Financial_System" },
          { name: "Indian Fiscal System", file: "Indian_Economy/Indian_Fiscal_System" },
          { name: "Money, Banking and Insurance in India", file: "Indian_Economy/Money_Banking_and_Insurance_in_India" },
          { name: "Tax System", file: "Indian_Economy/Tax_System" },
          { name: "Industry", file: "Indian_Economy/Industry" },
          { name: "Industrial Performance", file: "Indian_Economy/Industrial_Performance" },
          { name: "Trade and Commerce", file: "Indian_Economy/Trade_and_Commerce" },
          { name: "Some Noteworthy Facts and Definitions", file: "Indian_Economy/Some_Noteworthy_Facts_and_Definitions" },
          { name: "Some Economic and Financial Terms", file: "Indian_Economy/Some_Economic_and_Financial_Terms" },
          { name: "Miscellaneous", file: "Indian_Economy/Miscellaneous" }
        ]
      }
    ]
  },

  {
    title: "Art and Culture",
    colorClass: "Art_and_Culture",
    topics: [
      {
        name: "Art and Culture",
        subtopics: [
          { name: "Architecture", file: "Art_and_Culture/Architecture" },
          { name: "Sculpture", file: "Art_and_Culture/Sculpture" },
          { name: "Painting", file: "Art_and_Culture/Painting" },
          { name: "Festivals and Fairs", file: "Art_and_Culture/Festivals_and_Fairs" }
        ]
      }
    ]
  },

  {
    title: "Physics",
    colorClass: "Physics",
    topics: [
      {
        name: "Physics",
        subtopics: [
          { name: "Unit and Dimension", file: "Physics/Unit_and_Dimension" },
          { name: "Motion", file: "Physics/Motion" },
          { name: "Work, Energy and Power", file: "Physics/Work_Energy_and_Power" },
          { name: "Gravitation", file: "Physics/Gravitation" },
          { name: "Pressure", file: "Physics/Pressure" },
          { name: "Floatation", file: "Physics/Floatation" },
          { name: "Surface Tension", file: "Physics/Surface_Tension" },
          { name: "Viscosity", file: "Physics/Viscosity" },
          { name: "Elasticity", file: "Physics/Elasticity" },
          { name: "Simple Harmonic Motion", file: "Physics/Simple_Harmonic_Motion" },
          { name: "Wave", file: "Physics/Wave" },
          { name: "Sound Wave", file: "Physics/Sound_Wave" },
          { name: "Heat", file: "Physics/Heat" },
          { name: "Light", file: "Physics/Light" },
          { name: "Static Electricity", file: "Physics/Static_Electricity" },
          { name: "Current Electricity", file: "Physics/Current_Electricity" },
          { name: "Magnetism", file: "Physics/Magnetism" },
          { name: "Atomic & Nuclear Physics", file: "Physics/Atomic_Nuclear_Physics" },
          { name: "Electronics", file: "Physics/Electronics" },
          { name: "Scientific Instruments", file: "Physics/Scientific_Instruments" },
          { name: "Inventions", file: "Physics/Inventions" },
          { name: "Important Discoveries", file: "Physics/Important_Discoveries" },
          { name: "S.I. Units of Physical Quantity", file: "Physics/S_I_Units_of_Physical_Quantity" },
          { name: "Conversion of Units from One System to Another System", file: "Physics/Conversion_of_Units_from_One_System_to_Another_System" }
        ]
      }
    ]
  },

  {
    title: "Chemistry",
    colorClass: "Chemistry",
    topics: [
      {
        name: "Chemistry",
        subtopics: [
          { name: "Introduction", file: "Chemistry/Introduction" },
          { name: "Chemical Symbol Formula and Equation", file: "Chemistry/Chemical_Symbol_Formula_and_Equation" },
          { name: "Atomic Structure", file: "Chemistry/Atomic_Structure" },
          { name: "Periodic Classification of Elements", file: "Chemistry/Periodic_Classification_of_Elements" },
          { name: "Chemical Bonding", file: "Chemistry/Chemical_Bonding" },
          { name: "Oxidation & Reduction", file: "Chemistry/Oxidation_Reduction" },
          { name: "Solution", file: "Chemistry/Solution" },
          { name: "Acids, Bases & Salts", file: "Chemistry/Acids_Bases_Salts" },
          { name: "Behaviour of Gases & Energetics", file: "Chemistry/Behaviour_of_Gases_Energetics" },
          { name: "Energetics (Thermodynamics)", file: "Chemistry/Energetics_Thermodynamics" },
          { name: "Electrolysis", file: "Chemistry/Electrolysis" },
          { name: "Carbon and its Compounds", file: "Chemistry/Carbon_and_its_Compounds" },
          { name: "Fuels", file: "Chemistry/Fuels" },
          { name: "Metallurgy", file: "Chemistry/Metallurgy" },
          { name: "Important Facts About Some Metals", file: "Chemistry/Important_Facts_About_Some_Metals" },
          { name: "Non Metal", file: "Chemistry/Non_Metal" },
          { name: "Common Facts", file: "Chemistry/Common_Facts" },
          { name: "Man Made Substances", file: "Chemistry/Man_Made_Substances" }
        ]
      }
    ]
  },

  {
    title: "Biology",
    colorClass: "Biology",
    topics: [
      {
        name: "General Biology",
        subtopics: [
          { name: "Introduction", file: "Biology/General_Biology_Introduction" },
          { name: "What is Living?", file: "Biology/General_Biology_What_is_Living" },
          { name: "Classification of Organism", file: "Biology/General_Biology_Classification_of_Organism" },
          { name: "Study of Cell-Cytology", file: "Biology/General_Biology_Study_of_Cell_Cytology" },
          { name: "Genetics", file: "Biology/General_Biology_Genetics" },
          { name: "Sex Determination in Human", file: "Biology/General_Biology_Sex_Determination_in_Human" },
          { name: "Organic Evolution", file: "Biology/General_Biology_Organic_Evolution" }
        ]
      },
      {
        name: "Botany",
        subtopics: [
          { name: "Classification of Plantae", file: "Biology/Botany_Classification_of_Plantae" },
          { name: "Plant Morphology", file: "Biology/Botany_Plant_Morphology" },
          { name: "Plant Tissue", file: "Biology/Botany_Plant_Tissue" },
          { name: "Photosynthesis", file: "Biology/Botany_Photosynthesis" },
          { name: "Plant Hormones", file: "Biology/Botany_Plant_Hormones" },
          { name: "Plant Diseases", file: "Biology/Botany_Plant_Diseases" },
          { name: "Ecology", file: "Biology/Botany_Ecology" },
          { name: "Nitrogen Cycle", file: "Biology/Botany_Nitrogen_Cycle" },
          { name: "Pollution", file: "Biology/Botany_Pollution" }
        ]
      },
      {
        name: "Zoology",
        subtopics: [
          { name: "Classification of Animal Kingdom", file: "Biology/Zoology_Classification_of_Animal_Kingdom" },
          { name: "Animal Tissue", file: "Biology/Zoology_Animal_Tissue" },
          { name: "Human Blood", file: "Biology/Zoology_Human_Blood" },
          { name: "System of the Human Body", file: "Biology/Zoology_System_of_the_Human_Body" },
          { name: "Nutrients", file: "Biology/Zoology_Nutrients" },
          { name: "Human Diseases", file: "Biology/Zoology_Human_Diseases" },
          { name: "Miscellaneous", file: "Biology/Zoology_Miscellaneous" }
        ]
      }
    ]
  },

  {
    title: "Miscellany",
    colorClass: "Miscellany",
    topics: [
      {
        name: "Miscellany",
        subtopics: [
          { name: "Firsts in India", file: "Miscellany/Firsts_in_India" },
          { name: "Firsts in India (Male)", file: "Miscellany/Firsts_in_India_Male" },
          { name: "Firsts in India (Female)", file: "Miscellany/Firsts_in_India_Female" },
          { name: "Firsts in the World (Male, Female etc.)", file: "Miscellany/Firsts_in_the_World_Male_Female_etc" },
          { name: "Superlatives (India)", file: "Miscellany/Superlatives_India" },
          { name: "Superlatives (World)", file: "Miscellany/Superlatives_World" },
          { name: "Important Monuments/Structures (World)", file: "Miscellany/Important_Monuments_Structures_World" },
          { name: "National Emblems of Some Countries", file: "Miscellany/National_Emblems_of_Some_Countries" },
          { name: "National Animals of Some Countries", file: "Miscellany/National_Animals_of_Some_Countries" },
          { name: "Parliaments of Some Countries", file: "Miscellany/Parliaments_of_Some_Countries" },
          { name: "Some Important Signs or Symbols", file: "Miscellany/Some_Important_Signs_or_Symbols" },
          { name: "Some Official Books (World)", file: "Miscellany/Some_Official_Books_World" },
          { name: "Newspapers & Place of Publication (World)", file: "Miscellany/Newspapers_Place_of_Publication_World" },
          { name: "United Nations", file: "Miscellany/United_Nations" },
          { name: "World Organisations and their Headquarters", file: "Miscellany/World_Organisations_and_their_Headquarters" },
          { name: "Secretary Generals of UNO and their Tenure", file: "Miscellany/Secretary_Generals_of_UNO_and_their_Tenure" },
          { name: "United Nations International Weeks", file: "Miscellany/United_Nations_International_Weeks" },
          { name: "International Years", file: "Miscellany/International_Years" },
          { name: "Important Days (India and World)", file: "Miscellany/Important_Days_India_and_World" },
          { name: "UNESCO's World Heritage Sites (India)", file: "Miscellany/UNESCO_s_World_Heritage_Sites_India" },
          { name: "Famous Tourist Spots of India", file: "Miscellany/Famous_Tourist_Spots_of_India" },
          { name: "Defence of India", file: "Miscellany/Defence_of_India" },
          { name: "Internal Security of India", file: "Miscellany/Internal_Security_of_India" },
          { name: "Defence Training Institutions of India", file: "Miscellany/Defence_Training_Institutions_of_India" },
          { name: "Foundation Day of Some States", file: "Miscellany/Foundation_Day_of_Some_States" },
          { name: "Research Centres of India", file: "Miscellany/Research_Centres_of_India" },
          { name: "Nuclear And Space Research Centres in India", file: "Miscellany/Nuclear_And_Space_Research_Centres_in_India" },
          { name: "Health and Medicinal Research Centres in India", file: "Miscellany/Health_and_Medicinal_Research_Centres_in_India" },
          { name: "National Parks (Established after 1998)", file: "Miscellany/National_Parks_Established_after_1998" },
          { name: "Famous Musical Instruments and their Exponents", file: "Miscellany/Famous_Musical_Instruments_and_their_Exponents" },
          { name: "Important Classical Dances And Artists", file: "Miscellany/Important_Classical_Dances_And_Artists" },
          { name: "States and their Folk Dances", file: "Miscellany/States_and_their_Folk_Dances" },
          { name: "Cultural Organisations in India", file: "Miscellany/Cultural_Organisations_in_India" },
          { name: "Places Associated with Eminent Persons (World)", file: "Miscellany/Places_Associated_with_Eminent_Persons_World" },
          { name: "Crematorium of Famous Persons (India)", file: "Miscellany/Crematorium_of_Famous_Persons_India" },
          { name: "Famous Nicknames of Eminent Persons", file: "Miscellany/Famous_Nicknames_of_Eminent_Persons" },
          { name: "Some Great Works of Famous Persons", file: "Miscellany/Some_Great_Works_of_Famous_Persons" },
          { name: "Awards and Honours", file: "Miscellany/Awards_and_Honours" },
          { name: "Padma Awards", file: "Miscellany/Padma_Awards" },
          { name: "Gallantry Awards", file: "Miscellany/Gallantry_Awards" },
          { name: "Recipients of the Bharatiya Jnanpith Award", file: "Miscellany/Recipients_of_the_Bharatiya_Jnanpith_Award" },
          { name: "Recipients of Dada Saheb Phalke Award", file: "Miscellany/Recipients_of_Dada_Saheb_Phalke_Award" },
          { name: "Nobel Prize", file: "Miscellany/Nobel_Prize" },
          { name: "Oscar/Academy Award (Motion-Picture Award)", file: "Miscellany/Oscar_Academy_Award_Motion_Picture_Award" },
          { name: "Grammy Award (American Music Award)", file: "Miscellany/Grammy_Award_American_Music_Award" },
          { name: "Booker Prize (British Literary Award)", file: "Miscellany/Booker_Prize_British_Literary_Award" },
          { name: "Ramon Magsaysay Award", file: "Miscellany/Ramon_Magsaysay_Award" },
          { name: "Gandhi Peace Prize", file: "Miscellany/Gandhi_Peace_Prize" },
          { name: "UNESCO Kalinga Prize", file: "Miscellany/UNESCO_Kalinga_Prize" },
          { name: "Important Books and Authors", file: "Miscellany/Important_Books_and_Authors" },
          { name: "Important Committees (India)", file: "Miscellany/Important_Committees_India" },
          { name: "Committees and Commissions", file: "Miscellany/Committees_and_Commissions" },
          { name: "Youth Affairs, Games and Sports", file: "Miscellany/Youth_Affairs_Games_and_Sports" },
          { name: "Olympic Games", file: "Miscellany/Olympic_Games" },
          { name: "Paralympics and Winter Olympics", file: "Miscellany/Paralympics_and_Winter_Olympics" },
          { name: "Commonwealth Games", file: "Miscellany/Commonwealth_Games" },
          { name: "Asian Games", file: "Miscellany/Asian_Games" },
          { name: "SAF Games", file: "Miscellany/SAF_Games" },
          { name: "Cricket", file: "Miscellany/Cricket" },
          { name: "Football", file: "Miscellany/Football" },
          { name: "Hockey", file: "Miscellany/Hockey" },
          { name: "Some Important Facts", file: "Miscellany/Some_Important_Facts" },
          { name: "Cups and Trophies", file: "Miscellany/Cups_and_Trophies" },
          { name: "Famous Stadia and Sports", file: "Miscellany/Famous_Stadia_and_Sports" },
          { name: "National Games and Sports (World)", file: "Miscellany/National_Games_and_Sports_World" },
          { name: "Court or Field Associated with Sports", file: "Miscellany/Court_or_Field_Associated_with_Sports" },
          { name: "Number of Players in Some Popular Sports", file: "Miscellany/Number_of_Players_in_Some_Popular_Sports" },
          { name: "Nicknames of Eminent Players", file: "Miscellany/Nicknames_of_Eminent_Players" },
          { name: "Eminent Sportspersons (India)", file: "Miscellany/Eminent_Sportspersons_India" },
          { name: "Eminent International Players (Female)", file: "Miscellany/Eminent_International_Players_Female" },
          { name: "Eminent International Players (Male)", file: "Miscellany/Eminent_International_Players_Male" },
          { name: "Special Awards in Sports", file: "Miscellany/Special_Awards_in_Sports" },
          { name: "Miscellaneous", file: "Miscellany/Miscellaneous" }
        ]
      }
    ]
  },

  {
    title: "Computer",
    colorClass: "Computer",
    topics: [
      {
        name: "Computer",
        subtopics: [
          { name: "Introduction", file: "Computer/Introduction" },
          { name: "Five Generations of Computer", file: "Computer/Five_Generations_of_Computer" },
          { name: "Programming Languages of Different Generations", file: "Computer/Programming_Languages_of_Different_Generations" },
          { name: "Some Important Facts Related to Computers", file: "Computer/Some_Important_Facts_Related_to_Computers" },
          { name: "Units of Data Measurement", file: "Computer/Units_of_Data_Measurement" },
          { name: "Important Keyboard Shortcuts (Commands)", file: "Computer/Important_Keyboard_Shortcuts_Commands" },
          { name: "Glossary", file: "Computer/Glossary" },
          { name: "Abbreviations Associated with Computer", file: "Computer/Abbreviations_Associated_with_Computer" },
          { name: "Some Memorable Facts", file: "Computer/Some_Memorable_Facts" },
          { name: "Some Important Initiatives of the Government", file: "Computer/Some_Important_Initiatives_of_the_Government" }
        ]
      }
    ]
  },

];