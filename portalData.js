const PORTAL_DATA = [
  {
    title: "Indian History",
    colorClass: "Indian_History",
    topics: [
      {
        name: "Introduction",
        subtopics: [
          { name: "Introduction", file: "Indian_History_Introduction_Introduction" }
        ]
      },
      {
        name: "Ancient India",
        subtopics: [
          { name: "Historical Sources", file: "Indian_History_Ancient_India_Historical_Sources" },
          { name: "Pre-Historic Period", file: "Indian_History_Ancient_India_Pre_Historic_Period" },
          { name: "Harappan/Indus Civilization", file: "Indian_History_Ancient_India_Harappan_Indus_Civilization" },
          { name: "Vedic Culture", file: "Indian_History_Ancient_India_Vedic_Culture" },
          { name: "Mahajanapada Period", file: "Indian_History_Ancient_India_Mahajanapada_Period" },
          { name: "Religious Movements", file: "Indian_History_Ancient_India_Religious_Movements" },
          { name: "Maurya Period", file: "Indian_History_Ancient_India_Maurya_Period" },
          { name: "Post Maurya/Pre-Gupta Period", file: "Indian_History_Ancient_India_Post_Maurya_Pre_Gupta_Period" },
          { name: "The Sangam Period", file: "Indian_History_Ancient_India_The_Sangam_Period" },
          { name: "Gupta Period", file: "Indian_History_Ancient_India_Gupta_Period" },
          { name: "Post-Gupta Period/Vardhana Dynasty", file: "Indian_History_Ancient_India_Post_Gupta_Period_Vardhana_Dynasty" }
        ]
      },
      {
        name: "Medieval India",
        subtopics: [
          { name: "Early-Medieval Period: North India (Rajputa Period)", file: "Indian_History_Medieval_India_Early_Medieval_Period_North_India_Rajputa_Period" },
          { name: "Early-Medieval Period: South India (Cholas & Others)", file: "Indian_History_Medieval_India_Early_Medieval_Period_South_India_Cholas_Others" },
          { name: "Sultanate Period: The Delhi Sultanate", file: "Indian_History_Medieval_India_Sultanate_Period_The_Delhi_Sultanate" },
          { name: "Sultanate Period: Vijayanagar & Other Kingdoms", file: "Indian_History_Medieval_India_Sultanate_Period_Vijayanagar_Other_Kingdoms" },
          { name: "Religious Movements: Bhakti Movement", file: "Indian_History_Medieval_India_Religious_Movements_Bhakti_Movement" },
          { name: "Religious Movements: Sufi Movement", file: "Indian_History_Medieval_India_Religious_Movements_Sufi_Movement" },
          { name: "Mughal Period", file: "Indian_History_Medieval_India_Mughal_Period" },
          { name: "Maratha State & Maratha Confederacy", file: "Indian_History_Medieval_India_Maratha_State_Maratha_Confederacy" },
          { name: "The Advent of the Europeans", file: "Indian_History_Medieval_India_The_Advent_of_the_Europeans" }
        ]
      },
      {
        name: "Modern India",
        subtopics: [
          { name: "Expansion of British Power (Bengal, Mysore, Punjab etc.)", file: "Indian_History_Modern_India_Expansion_of_British_Power_Bengal_Mysore_Punjab_etc" },
          { name: "Economic Impact of British Rule", file: "Indian_History_Modern_India_Economic_Impact_of_British_Rule" },
          { name: "Socio-Religious Movements in 19th-20th Centuries", file: "Indian_History_Modern_India_Socio_Religious_Movements_in_19th_20th_Centuries" },
          { name: "Freedom Struggle: The Revolt of 1857", file: "Indian_History_Modern_India_Freedom_Struggle_The_Revolt_of_1857" },
          { name: "Freedom Struggle: Moderate Phase", file: "Indian_History_Modern_India_Freedom_Struggle_Moderate_Phase" },
          { name: "Freedom Struggle: Extremist Phase", file: "Indian_History_Modern_India_Freedom_Struggle_Extremist_Phase" },
          { name: "Freedom Struggle: The Gandhian Era", file: "Indian_History_Modern_India_Freedom_Struggle_The_Gandhian_Era" }
        ]
      },
      {
        name: "Miscellaneous (History)",
        subtopics: [
          { name: "Important Dates", file: "Indian_History_Miscellaneous_History_Important_Dates" },
          { name: "Important Places", file: "Indian_History_Miscellaneous_History_Important_Places" },
          { name: "Important Foreign Travellers/Envoys", file: "Indian_History_Miscellaneous_History_Important_Foreign_Travellers_Envoys" },
          { name: "Abbreviated or Alternative Names", file: "Indian_History_Miscellaneous_History_Abbreviated_or_Alternative_Names" },
          { name: "Important Sayings", file: "Indian_History_Miscellaneous_History_Important_Sayings" },
          { name: "Important Battles", file: "Indian_History_Miscellaneous_History_Important_Battles" },
          { name: "Reforms/Acts", file: "Indian_History_Miscellaneous_History_Reforms_Acts" },
          { name: "Educational Committees/Commissions", file: "Indian_History_Miscellaneous_History_Educational_Committees_Commissions" },
          { name: "Economic Committees/Commissions", file: "Indian_History_Miscellaneous_History_Economic_Committees_Commissions" },
          { name: "Administrative Committees/Commissions", file: "Indian_History_Miscellaneous_History_Administrative_Committees_Commissions" },
          { name: "Important Congress Session", file: "Indian_History_Miscellaneous_History_Important_Congress_Session" },
          { name: "Governor-Generals & Viceroys", file: "Indian_History_Miscellaneous_History_Governor_Generals_Viceroys" }
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
          { name: "Mesopotamian Civilization", file: "World_History_Ancient_World_Mesopotamian_Civilization" },
          { name: "Egyptian Civilization", file: "World_History_Ancient_World_Egyptian_Civilization" },
          { name: "Harappan Civilization", file: "World_History_Ancient_World_Harappan_Civilization" },
          { name: "Chinese Civilization", file: "World_History_Ancient_World_Chinese_Civilization" },
          { name: "Iranian Civilization", file: "World_History_Ancient_World_Iranian_Civilization" },
          { name: "Greek Civilization", file: "World_History_Ancient_World_Greek_Civilization" },
          { name: "Roman Civilization", file: "World_History_Ancient_World_Roman_Civilization" }
        ]
      },
      {
        name: "Medieval World",
        subtopics: [
          { name: "Medieval Europe", file: "World_History_Medieval_World_Medieval_Europe" },
          { name: "Feudalism", file: "World_History_Medieval_World_Feudalism" },
          { name: "Crusades", file: "World_History_Medieval_World_Crusades" },
          { name: "Arab Civilization", file: "World_History_Medieval_World_Arab_Civilization" },
          { name: "Medieval China", file: "World_History_Medieval_World_Medieval_China" },
          { name: "Medieval Japan", file: "World_History_Medieval_World_Medieval_Japan" },
          { name: "Seven Wonders of Medieval World", file: "World_History_Medieval_World_Seven_Wonders_of_Medieval_World" }
        ]
      },
      {
        name: "Modern World",
        subtopics: [
          { name: "Renaissance", file: "World_History_Modern_World_Renaissance" },
          { name: "Reformation", file: "World_History_Modern_World_Reformation" },
          { name: "Geographical Discoveries", file: "World_History_Modern_World_Geographical_Discoveries" },
          { name: "Glorious Revolution", file: "World_History_Modern_World_Glorious_Revolution" },
          { name: "Industrial Revolution", file: "World_History_Modern_World_Industrial_Revolution" },
          { name: "American Revolution", file: "World_History_Modern_World_American_Revolution" },
          { name: "French Revolution", file: "World_History_Modern_World_French_Revolution" },
          { name: "Unification of Italy", file: "World_History_Modern_World_Unification_of_Italy" },
          { name: "Unification of Germany", file: "World_History_Modern_World_Unification_of_Germany" },
          { name: "First World War", file: "World_History_Modern_World_First_World_War" },
          { name: "Russian Revolution", file: "World_History_Modern_World_Russian_Revolution" },
          { name: "Chinese Revolution", file: "World_History_Modern_World_Chinese_Revolution" },
          { name: "Turkish Revolution", file: "World_History_Modern_World_Turkish_Revolution" },
          { name: "Economic Depression of the World: 1929-34", file: "World_History_Modern_World_Economic_Depression_of_the_World_1929_34" },
          { name: "Fascism in Italy", file: "World_History_Modern_World_Fascism_in_Italy" },
          { name: "Nazism in Germany", file: "World_History_Modern_World_Nazism_in_Germany" },
          { name: "Militarism in Japan", file: "World_History_Modern_World_Militarism_in_Japan" },
          { name: "Second World War", file: "World_History_Modern_World_Second_World_War" }
        ]
      },
      {
        name: "Miscellaneous (World History)",
        subtopics: [
          { name: "Important Dates", file: "World_History_Miscellaneous_World_History_Important_Dates" },
          { name: "Association of Places", file: "World_History_Miscellaneous_World_History_Association_of_Places" },
          { name: "Abbreviated or Alternative Names", file: "World_History_Miscellaneous_World_History_Abbreviated_or_Alternative_Names" },
          { name: "Important Battles", file: "World_History_Miscellaneous_World_History_Important_Battles" }
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
          { name: "Highlights", file: "Geography_Highlights" },
          { name: "Indian's Contribution in Geography", file: "Geography_Indian_s_Contribution_in_Geography" },
          { name: "Universe", file: "Geography_Universe" },
          { name: "Galaxy", file: "Geography_Galaxy" },
          { name: "The Big Bang Theory", file: "Geography_The_Big_Bang_Theory" },
          { name: "Higgs Boson", file: "Geography_Higgs_Boson" },
          { name: "Star", file: "Geography_Star" },
          { name: "The Solar System", file: "Geography_The_Solar_System" },
          { name: "Heliocentrism", file: "Geography_Heliocentrism" },
          { name: "Geocentric Model", file: "Geography_Geocentric_Model" },
          { name: "Members of the Solar System", file: "Geography_Members_of_the_Solar_System" },
          { name: "Aditya-L1", file: "Geography_Aditya_L1" },
          { name: "The Planets", file: "Geography_The_Planets" },
          { name: "Classification of Planets", file: "Geography_Classification_of_Planets" },
          { name: "Some Notable Facts About Various Planets and Satellites", file: "Geography_Some_Notable_Facts_About_Various_Planets_and_Satellites" },
          { name: "Super Moon", file: "Geography_Super_Moon" },
          { name: "Blue Moon", file: "Geography_Blue_Moon" },
          { name: "Chandrayaan-1,2,3", file: "Geography_Chandrayaan_1_2_3" },
          { name: "Some Facts and Figures about the Planets", file: "Geography_Some_Facts_and_Figures_about_the_Planets" },
          { name: "Some Well Known Constellations", file: "Geography_Some_Well_Known_Constellations" },
          { name: "The Earth: Shape and Size", file: "Geography_The_Earth_Shape_and_Size" },
          { name: "Statistical Data of the Earth", file: "Geography_Statistical_Data_of_the_Earth" },
          { name: "Continents of the World", file: "Geography_Continents_of_the_World" },
          { name: "Oceans on the Earth", file: "Geography_Oceans_on_the_Earth" },
          { name: "Pacific and Atlantic Ocean Currents", file: "Geography_Pacific_and_Atlantic_Ocean_Currents" },
          { name: "Indian Ocean Currents", file: "Geography_Indian_Ocean_Currents" },
          { name: "Biosphere", file: "Geography_Biosphere" },
          { name: "Lithosphere", file: "Geography_Lithosphere" },
          { name: "Hydrosphere", file: "Geography_Hydrosphere" },
          { name: "Latitude and Longitude", file: "Geography_Latitude_and_Longitude" },
          { name: "Local Time and Time Zones", file: "Geography_Local_Time_and_Time_Zones" },
          { name: "The Date Line and Universal Time", file: "Geography_The_Date_Line_and_Universal_Time" },
          { name: "Indian Standard Time (IST)", file: "Geography_Indian_Standard_Time_IST" },
          { name: "Lines Crossing Different Countries", file: "Geography_Lines_Crossing_Different_Countries" },
          { name: "Earth and its Relation with the Sun", file: "Geography_Earth_and_its_Relation_with_the_Sun" },
          { name: "Coriolis Effect", file: "Geography_Coriolis_Effect" },
          { name: "Solstice", file: "Geography_Solstice" },
          { name: "Equinoxes", file: "Geography_Equinoxes" },
          { name: "Midnight Sun", file: "Geography_Midnight_Sun" },
          { name: "Eclipses", file: "Geography_Eclipses" },
          { name: "Atmosphere", file: "Geography_Atmosphere" },
          { name: "Layers of the Atmosphere", file: "Geography_Layers_of_the_Atmosphere" },
          { name: "How The Sun Creates Energy", file: "Geography_How_The_Sun_Creates_Energy" },
          { name: "Weather and Climate", file: "Geography_Weather_and_Climate" },
          { name: "Humidity", file: "Geography_Humidity" },
          { name: "Atmospheric Pressure", file: "Geography_Atmospheric_Pressure" },
          { name: "Winds", file: "Geography_Winds" },
          { name: "Clouds", file: "Geography_Clouds" },
          { name: "Rain Fall", file: "Geography_Rain_Fall" },
          { name: "Islands", file: "Geography_Islands" },
          { name: "Internal Structure of the Earth", file: "Geography_Internal_Structure_of_the_Earth" },
          { name: "Rocks", file: "Geography_Rocks" },
          { name: "Earthquakes and Volcanoes", file: "Geography_Earthquakes_and_Volcanoes" },
          { name: "World Distribution of Volcanoes", file: "Geography_World_Distribution_of_Volcanoes" },
          { name: "Mountains", file: "Geography_Mountains" },
          { name: "Plateaus", file: "Geography_Plateaus" },
          { name: "Plains", file: "Geography_Plains" },
          { name: "Forests", file: "Geography_Forests" },
          { name: "India State of Forest Report-2019", file: "Geography_India_State_of_Forest_Report_2019" },
          { name: "Land Forms Created by the River System", file: "Geography_Land_Forms_Created_by_the_River_System" },
          { name: "Land Forms Created by the Actions of Wind", file: "Geography_Land_Forms_Created_by_the_Actions_of_Wind" },
          { name: "Land Forms Created by the Actions of Groundwater", file: "Geography_Land_Forms_Created_by_the_Actions_of_Groundwater" },
          { name: "Land Forms Created by the Actions of Sea Waves", file: "Geography_Land_Forms_Created_by_the_Actions_of_Sea_Waves" },
          { name: "The Indian Sub-Continent: Position, Extent and Physical Features", file: "Geography_The_Indian_Sub_Continent_Position_Extent_and_Physical_Features" },
          { name: "Division of Himalayas", file: "Geography_Division_of_Himalayas" },
          { name: "Major Passes of India", file: "Geography_Major_Passes_of_India" },
          { name: "The Coastal Plains", file: "Geography_The_Coastal_Plains" },
          { name: "Soil Resources of the Indian Sub-continent", file: "Geography_Soil_Resources_of_the_Indian_Sub_continent" },
          { name: "Kinds of Farming", file: "Geography_Kinds_of_Farming" },
          { name: "Agriculture in India", file: "Geography_Agriculture_in_India" },
          { name: "Minerals in India: Some Notable Facts", file: "Geography_Minerals_in_India_Some_Notable_Facts" },
          { name: "Major Industries of India", file: "Geography_Major_Industries_of_India" },
          { name: "The Drainage System of India", file: "Geography_The_Drainage_System_of_India" },
          { name: "The River Systems of the Himalayan Drainage", file: "Geography_The_River_Systems_of_the_Himalayan_Drainage" },
          { name: "Major Water Channels of India", file: "Geography_Major_Water_Channels_of_India" },
          { name: "The Peninsular Drainage System", file: "Geography_The_Peninsular_Drainage_System" },
          { name: "Water Resources and Their Utilisation in India", file: "Geography_Water_Resources_and_Their_Utilisation_in_India" },
          { name: "Multipurpose River Valley Projects", file: "Geography_Multipurpose_River_Valley_Projects" },
          { name: "Transport in India", file: "Geography_Transport_in_India" },
          { name: "National Highways", file: "Geography_National_Highways" },
          { name: "Rail Transport", file: "Geography_Rail_Transport" },
          { name: "Civil Aviation", file: "Geography_Civil_Aviation" },
          { name: "Maritime Transport", file: "Geography_Maritime_Transport" },
          { name: "Major Ports and Non-Major Ports", file: "Geography_Major_Ports_and_Non_Major_Ports" },
          { name: "India Facts and Figures", file: "Geography_India_Facts_and_Figures" },
          { name: "State and UT's and their Capitals", file: "Geography_State_and_UT_s_and_their_Capitals" },
          { name: "Census", file: "Geography_Census" },
          { name: "Top 10 Most Populous Countries", file: "Geography_Top_10_Most_Populous_Countries" },
          { name: "Wildlife Sanctuaries and National Parks in India", file: "Geography_Wildlife_Sanctuaries_and_National_Parks_in_India" },
          { name: "RAMSAR Wetland Sites", file: "Geography_RAMSAR_Wetland_Sites" },
          { name: "Important Irrigation and Power Projects", file: "Geography_Important_Irrigation_and_Power_Projects" },
          { name: "Length of India's Border with the Neighbouring Countries", file: "Geography_Length_of_India_s_Border_with_the_Neighbouring_Countries" },
          { name: "Colour Revolutions in India", file: "Geography_Colour_Revolutions_in_India" },
          { name: "Project Tiger", file: "Geography_Project_Tiger" },
          { name: "Tiger Reserves in India", file: "Geography_Tiger_Reserves_in_India" },
          { name: "Protected Areas of India", file: "Geography_Protected_Areas_of_India" },
          { name: "Cities at the Bank of River", file: "Geography_Cities_at_the_Bank_of_River" },
          { name: "Towns Associated with Important Industries (India)", file: "Geography_Towns_Associated_with_Important_Industries_India" },
          { name: "Famous Cities (India)", file: "Geography_Famous_Cities_India" },
          { name: "New Changed Names (India)", file: "Geography_New_Changed_Names_India" },
          { name: "Indian States with Longest Border", file: "Geography_Indian_States_with_Longest_Border" },
          { name: "International Land Border", file: "Geography_International_Land_Border" },
          { name: "Major Waterfalls of India", file: "Geography_Major_Waterfalls_of_India" },
          { name: "Major Lakes of India", file: "Geography_Major_Lakes_of_India" },
          { name: "Revised Length of Coastline of India", file: "Geography_Revised_Length_of_Coastline_of_India" },
          { name: "Mount Everest", file: "Geography_Mount_Everest" },
          { name: "Wonders of the World", file: "Geography_Wonders_of_the_World" },
          { name: "Important Crops and their Producers", file: "Geography_Important_Crops_and_their_Producers" },
          { name: "Important Minerals and their Producers", file: "Geography_Important_Minerals_and_their_Producers" },
          { name: "World's Manufacturing Industries", file: "Geography_World_s_Manufacturing_Industries" },
          { name: "Famous Sites (India)", file: "Geography_Famous_Sites_India" },
          { name: "Famous Sites (World)", file: "Geography_Famous_Sites_World" },
          { name: "Highest Mountain Peaks (World)", file: "Geography_Highest_Mountain_Peaks_World" },
          { name: "Three Deepest Oceans", file: "Geography_Three_Deepest_Oceans" },
          { name: "Major Straits of the World (Connects / Separates)", file: "Geography_Major_Straits_of_the_World_Connects_Separates" },
          { name: "Important Discoveries", file: "Geography_Important_Discoveries" },
          { name: "Major Canals", file: "Geography_Major_Canals" },
          { name: "Major Waterfalls", file: "Geography_Major_Waterfalls" },
          { name: "Major Lakes", file: "Geography_Major_Lakes" },
          { name: "Major Islands", file: "Geography_Major_Islands" },
          { name: "Major Deserts", file: "Geography_Major_Deserts" },
          { name: "Top 10 Countries with Largest Aquatic Area", file: "Geography_Top_10_Countries_with_Largest_Aquatic_Area" },
          { name: "Top 10 Countries with Longest Coastline", file: "Geography_Top_10_Countries_with_Longest_Coastline" },
          { name: "Geographical Epithets", file: "Geography_Geographical_Epithets" },
          { name: "International Boundary Lines", file: "Geography_International_Boundary_Lines" },
          { name: "Tribes and their Homeland", file: "Geography_Tribes_and_their_Homeland" },
          { name: "Map Lines", file: "Geography_Map_Lines" },
          { name: "Land Locked Countries", file: "Geography_Land_Locked_Countries" },
          { name: "Imp. Places in the World", file: "Geography_Imp_Places_in_the_World" },
          { name: "Major Dams (World)", file: "Geography_Major_Dams_World" },
          { name: "Country, Capital and Currency", file: "Geography_Country_Capital_and_Currency" },
          { name: "Glossary of Geographical Terms", file: "Geography_Glossary_of_Geographical_Terms" },
          { name: "Miscellaneous", file: "Geography_Miscellaneous" }
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
          { name: "Introduction", file: "Environment_Introduction" },
          { name: "Lithosphere, Hydrosphere & Atmosphere", file: "Environment_Lithosphere_Hydrosphere_Atmosphere" },
          { name: "Ecology: Study/Science of Biosphere", file: "Environment_Ecology_Study_Science_of_Biosphere" },
          { name: "Biodiversity", file: "Environment_Biodiversity" },
          { name: "Environmental Issues/Problems & Their Management/Measures: Pollution, Biodiversity Loss & Climate Change", file: "Environment_Environmental_Issues_Problems_Their_Management_Measures_Pollution_Biodiversity_Loss_Climate_Change" },
          { name: "Miscellaneous", file: "Environment_Miscellaneous" }
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
          { name: "Evolution of Indian Constitution", file: "Indian_Polity_and_Constitution_Evolution_of_Indian_Constitution" },
          { name: "Constituent Assembly and Making of the Constitution", file: "Indian_Polity_and_Constitution_Constituent_Assembly_and_Making_of_the_Constitution" },
          { name: "Different Sources of Indian Constitution", file: "Indian_Polity_and_Constitution_Different_Sources_of_Indian_Constitution" },
          { name: "Important Parts, Articles of the Constitution", file: "Indian_Polity_and_Constitution_Important_Parts_Articles_of_the_Constitution" },
          { name: "Schedules of Indian Constitution", file: "Indian_Polity_and_Constitution_Schedules_of_Indian_Constitution" },
          { name: "Special Features of Indian Constitution", file: "Indian_Polity_and_Constitution_Special_Features_of_Indian_Constitution" },
          { name: "The Writs", file: "Indian_Polity_and_Constitution_The_Writs" },
          { name: "Directive Principles of State Policy", file: "Indian_Polity_and_Constitution_Directive_Principles_of_State_Policy" },
          { name: "Fundamental Duties", file: "Indian_Polity_and_Constitution_Fundamental_Duties" },
          { name: "Procedure for Amending the Constitution", file: "Indian_Polity_and_Constitution_Procedure_for_Amending_the_Constitution" },
          { name: "The Doctrine of Basic Features", file: "Indian_Polity_and_Constitution_The_Doctrine_of_Basic_Features" },
          { name: "Some Important Constitutional Amendment Acts", file: "Indian_Polity_and_Constitution_Some_Important_Constitutional_Amendment_Acts" },
          { name: "Executive of the Union", file: "Indian_Polity_and_Constitution_Executive_of_the_Union" },
          { name: "Emergency Provisions", file: "Indian_Polity_and_Constitution_Emergency_Provisions" },
          { name: "The Vice-President", file: "Indian_Polity_and_Constitution_The_Vice_President" },
          { name: "The Prime Minister and The Union Council of Ministers", file: "Indian_Polity_and_Constitution_The_Prime_Minister_and_The_Union_Council_of_Ministers" },
          { name: "The Attorney-General for India", file: "Indian_Polity_and_Constitution_The_Attorney_General_for_India" },
          { name: "The Comptroller and Auditor General", file: "Indian_Polity_and_Constitution_The_Comptroller_and_Auditor_General" },
          { name: "The Parliament of India", file: "Indian_Polity_and_Constitution_The_Parliament_of_India" },
          { name: "Parliamentary Terms", file: "Indian_Polity_and_Constitution_Parliamentary_Terms" },
          { name: "The Supreme Court", file: "Indian_Polity_and_Constitution_The_Supreme_Court" },
          { name: "The High Court", file: "Indian_Polity_and_Constitution_The_High_Court" },
          { name: "Centre-State Relations", file: "Indian_Polity_and_Constitution_Centre_State_Relations" },
          { name: "Executive of the States", file: "Indian_Polity_and_Constitution_Executive_of_the_States" },
          { name: "Panchayati Raj", file: "Indian_Polity_and_Constitution_Panchayati_Raj" },
          { name: "Municipalities", file: "Indian_Polity_and_Constitution_Municipalities" },
          { name: "Inter-State Relations", file: "Indian_Polity_and_Constitution_Inter_State_Relations" },
          { name: "Planning Commission", file: "Indian_Polity_and_Constitution_Planning_Commission" },
          { name: "NITI Aayog", file: "Indian_Polity_and_Constitution_NITI_Aayog" },
          { name: "National Development Council (NDC)", file: "Indian_Polity_and_Constitution_National_Development_Council_NDC" },
          { name: "National Integration Council", file: "Indian_Polity_and_Constitution_National_Integration_Council" },
          { name: "Finance Commission", file: "Indian_Polity_and_Constitution_Finance_Commission" },
          { name: "Public Service Commissions", file: "Indian_Polity_and_Constitution_Public_Service_Commissions" },
          { name: "Election", file: "Indian_Polity_and_Constitution_Election" },
          { name: "Delimitation Commission of India", file: "Indian_Polity_and_Constitution_Delimitation_Commission_of_India" },
          { name: "The Official Languages", file: "Indian_Polity_and_Constitution_The_Official_Languages" },
          { name: "National Symbols", file: "Indian_Polity_and_Constitution_National_Symbols" },
          { name: "Some Important Comments", file: "Indian_Polity_and_Constitution_Some_Important_Comments" },
          { name: "Some Important Statements", file: "Indian_Polity_and_Constitution_Some_Important_Statements" },
          { name: "Some Important Definitions", file: "Indian_Polity_and_Constitution_Some_Important_Definitions" },
          { name: "Some Important Books (Polity)", file: "Indian_Polity_and_Constitution_Some_Important_Books_Polity" },
          { name: "Miscellaneous", file: "Indian_Polity_and_Constitution_Miscellaneous" }
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
          { name: "Highlights of Indian Economy", file: "Indian_Economy_Highlights_of_Indian_Economy" },
          { name: "Economy and Economics", file: "Indian_Economy_Economy_and_Economics" },
          { name: "Characteristics of Indian Economy", file: "Indian_Economy_Characteristics_of_Indian_Economy" },
          { name: "Agriculture and Allied Sector", file: "Indian_Economy_Agriculture_and_Allied_Sector" },
          { name: "National Income", file: "Indian_Economy_National_Income" },
          { name: "Economic Planning and Development", file: "Indian_Economy_Economic_Planning_and_Development" },
          { name: "Unemployment and Employment", file: "Indian_Economy_Unemployment_and_Employment" },
          { name: "New Economic Policy and Reforms", file: "Indian_Economy_New_Economic_Policy_and_Reforms" },
          { name: "Indian Financial System", file: "Indian_Economy_Indian_Financial_System" },
          { name: "Indian Fiscal System", file: "Indian_Economy_Indian_Fiscal_System" },
          { name: "Money, Banking and Insurance in India", file: "Indian_Economy_Money_Banking_and_Insurance_in_India" },
          { name: "Tax System", file: "Indian_Economy_Tax_System" },
          { name: "Industry", file: "Indian_Economy_Industry" },
          { name: "Industrial Performance", file: "Indian_Economy_Industrial_Performance" },
          { name: "Trade and Commerce", file: "Indian_Economy_Trade_and_Commerce" },
          { name: "Some Noteworthy Facts and Definitions", file: "Indian_Economy_Some_Noteworthy_Facts_and_Definitions" },
          { name: "Some Economic and Financial Terms", file: "Indian_Economy_Some_Economic_and_Financial_Terms" },
          { name: "Miscellaneous", file: "Indian_Economy_Miscellaneous" }
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
          { name: "Architecture", file: "Art_and_Culture_Architecture" },
          { name: "Sculpture", file: "Art_and_Culture_Sculpture" },
          { name: "Painting", file: "Art_and_Culture_Painting" },
          { name: "Festivals and Fairs", file: "Art_and_Culture_Festivals_and_Fairs" }
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
          { name: "Unit and Dimension", file: "Physics_Unit_and_Dimension" },
          { name: "Motion", file: "Physics_Motion" },
          { name: "Work, Energy and Power", file: "Physics_Work_Energy_and_Power" },
          { name: "Gravitation", file: "Physics_Gravitation" },
          { name: "Pressure", file: "Physics_Pressure" },
          { name: "Floatation", file: "Physics_Floatation" },
          { name: "Surface Tension", file: "Physics_Surface_Tension" },
          { name: "Viscosity", file: "Physics_Viscosity" },
          { name: "Elasticity", file: "Physics_Elasticity" },
          { name: "Simple Harmonic Motion", file: "Physics_Simple_Harmonic_Motion" },
          { name: "Wave", file: "Physics_Wave" },
          { name: "Sound Wave", file: "Physics_Sound_Wave" },
          { name: "Heat", file: "Physics_Heat" },
          { name: "Light", file: "Physics_Light" },
          { name: "Static Electricity", file: "Physics_Static_Electricity" },
          { name: "Current Electricity", file: "Physics_Current_Electricity" },
          { name: "Magnetism", file: "Physics_Magnetism" },
          { name: "Atomic & Nuclear Physics", file: "Physics_Atomic_Nuclear_Physics" },
          { name: "Electronics", file: "Physics_Electronics" },
          { name: "Scientific Instruments", file: "Physics_Scientific_Instruments" },
          { name: "Inventions", file: "Physics_Inventions" },
          { name: "Important Discoveries", file: "Physics_Important_Discoveries" },
          { name: "S.I. Units of Physical Quantity", file: "Physics_S_I_Units_of_Physical_Quantity" },
          { name: "Conversion of Units from One System to Another System", file: "Physics_Conversion_of_Units_from_One_System_to_Another_System" }
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
          { name: "Introduction", file: "Chemistry_Introduction" },
          { name: "Chemical Symbol Formula and Equation", file: "Chemistry_Chemical_Symbol_Formula_and_Equation" },
          { name: "Atomic Structure", file: "Chemistry_Atomic_Structure" },
          { name: "Periodic Classification of Elements", file: "Chemistry_Periodic_Classification_of_Elements" },
          { name: "Chemical Bonding", file: "Chemistry_Chemical_Bonding" },
          { name: "Oxidation & Reduction", file: "Chemistry_Oxidation_Reduction" },
          { name: "Solution", file: "Chemistry_Solution" },
          { name: "Acids, Bases & Salts", file: "Chemistry_Acids_Bases_Salts" },
          { name: "Behaviour of Gases & Energetics", file: "Chemistry_Behaviour_of_Gases_Energetics" },
          { name: "Energetics (Thermodynamics)", file: "Chemistry_Energetics_Thermodynamics" },
          { name: "Electrolysis", file: "Chemistry_Electrolysis" },
          { name: "Carbon and its Compounds", file: "Chemistry_Carbon_and_its_Compounds" },
          { name: "Fuels", file: "Chemistry_Fuels" },
          { name: "Metallurgy", file: "Chemistry_Metallurgy" },
          { name: "Important Facts About Some Metals", file: "Chemistry_Important_Facts_About_Some_Metals" },
          { name: "Non Metal", file: "Chemistry_Non_Metal" },
          { name: "Common Facts", file: "Chemistry_Common_Facts" },
          { name: "Man Made Substances", file: "Chemistry_Man_Made_Substances" }
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
          { name: "Introduction", file: "Biology_General_Biology_Introduction" },
          { name: "What is Living?", file: "Biology_General_Biology_What_is_Living" },
          { name: "Classification of Organism", file: "Biology_General_Biology_Classification_of_Organism" },
          { name: "Study of Cell-Cytology", file: "Biology_General_Biology_Study_of_Cell_Cytology" },
          { name: "Genetics", file: "Biology_General_Biology_Genetics" },
          { name: "Sex Determination in Human", file: "Biology_General_Biology_Sex_Determination_in_Human" },
          { name: "Organic Evolution", file: "Biology_General_Biology_Organic_Evolution" }
        ]
      },
      {
        name: "Botany",
        subtopics: [
          { name: "Classification of Plantae", file: "Biology_Botany_Classification_of_Plantae" },
          { name: "Plant Morphology", file: "Biology_Botany_Plant_Morphology" },
          { name: "Plant Tissue", file: "Biology_Botany_Plant_Tissue" },
          { name: "Photosynthesis", file: "Biology_Botany_Photosynthesis" },
          { name: "Plant Hormones", file: "Biology_Botany_Plant_Hormones" },
          { name: "Plant Diseases", file: "Biology_Botany_Plant_Diseases" },
          { name: "Ecology", file: "Biology_Botany_Ecology" },
          { name: "Nitrogen Cycle", file: "Biology_Botany_Nitrogen_Cycle" },
          { name: "Pollution", file: "Biology_Botany_Pollution" }
        ]
      },
      {
        name: "Zoology",
        subtopics: [
          { name: "Classification of Animal Kingdom", file: "Biology_Zoology_Classification_of_Animal_Kingdom" },
          { name: "Animal Tissue", file: "Biology_Zoology_Animal_Tissue" },
          { name: "Human Blood", file: "Biology_Zoology_Human_Blood" },
          { name: "System of the Human Body", file: "Biology_Zoology_System_of_the_Human_Body" },
          { name: "Nutrients", file: "Biology_Zoology_Nutrients" },
          { name: "Human Diseases", file: "Biology_Zoology_Human_Diseases" },
          { name: "Miscellaneous", file: "Biology_Zoology_Miscellaneous" }
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
          { name: "Firsts in India", file: "Miscellany_Firsts_in_India" },
          { name: "Firsts in India (Male)", file: "Miscellany_Firsts_in_India_Male" },
          { name: "Firsts in India (Female)", file: "Miscellany_Firsts_in_India_Female" },
          { name: "Firsts in the World (Male, Female etc.)", file: "Miscellany_Firsts_in_the_World_Male_Female_etc" },
          { name: "Superlatives (India)", file: "Miscellany_Superlatives_India" },
          { name: "Superlatives (World)", file: "Miscellany_Superlatives_World" },
          { name: "Important Monuments/Structures (World)", file: "Miscellany_Important_Monuments_Structures_World" },
          { name: "National Emblems of Some Countries", file: "Miscellany_National_Emblems_of_Some_Countries" },
          { name: "National Animals of Some Countries", file: "Miscellany_National_Animals_of_Some_Countries" },
          { name: "Parliaments of Some Countries", file: "Miscellany_Parliaments_of_Some_Countries" },
          { name: "Some Important Signs or Symbols", file: "Miscellany_Some_Important_Signs_or_Symbols" },
          { name: "Some Official Books (World)", file: "Miscellany_Some_Official_Books_World" },
          { name: "Newspapers & Place of Publication (World)", file: "Miscellany_Newspapers_Place_of_Publication_World" },
          { name: "United Nations", file: "Miscellany_United_Nations" },
          { name: "World Organisations and their Headquarters", file: "Miscellany_World_Organisations_and_their_Headquarters" },
          { name: "Secretary Generals of UNO and their Tenure", file: "Miscellany_Secretary_Generals_of_UNO_and_their_Tenure" },
          { name: "United Nations International Weeks", file: "Miscellany_United_Nations_International_Weeks" },
          { name: "International Years", file: "Miscellany_International_Years" },
          { name: "Important Days (India and World)", file: "Miscellany_Important_Days_India_and_World" },
          { name: "UNESCO's World Heritage Sites (India)", file: "Miscellany_UNESCO_s_World_Heritage_Sites_India" },
          { name: "Famous Tourist Spots of India", file: "Miscellany_Famous_Tourist_Spots_of_India" },
          { name: "Defence of India", file: "Miscellany_Defence_of_India" },
          { name: "Internal Security of India", file: "Miscellany_Internal_Security_of_India" },
          { name: "Defence Training Institutions of India", file: "Miscellany_Defence_Training_Institutions_of_India" },
          { name: "Foundation Day of Some States", file: "Miscellany_Foundation_Day_of_Some_States" },
          { name: "Research Centres of India", file: "Miscellany_Research_Centres_of_India" },
          { name: "Nuclear And Space Research Centres in India", file: "Miscellany_Nuclear_And_Space_Research_Centres_in_India" },
          { name: "Health and Medicinal Research Centres in India", file: "Miscellany_Health_and_Medicinal_Research_Centres_in_India" },
          { name: "National Parks (Established after 1998)", file: "Miscellany_National_Parks_Established_after_1998" },
          { name: "Famous Musical Instruments and their Exponents", file: "Miscellany_Famous_Musical_Instruments_and_their_Exponents" },
          { name: "Important Classical Dances And Artists", file: "Miscellany_Important_Classical_Dances_And_Artists" },
          { name: "States and their Folk Dances", file: "Miscellany_States_and_their_Folk_Dances" },
          { name: "Cultural Organisations in India", file: "Miscellany_Cultural_Organisations_in_India" },
          { name: "Places Associated with Eminent Persons (World)", file: "Miscellany_Places_Associated_with_Eminent_Persons_World" },
          { name: "Crematorium of Famous Persons (India)", file: "Miscellany_Crematorium_of_Famous_Persons_India" },
          { name: "Famous Nicknames of Eminent Persons", file: "Miscellany_Famous_Nicknames_of_Eminent_Persons" },
          { name: "Some Great Works of Famous Persons", file: "Miscellany_Some_Great_Works_of_Famous_Persons" },
          { name: "Awards and Honours", file: "Miscellany_Awards_and_Honours" },
          { name: "Padma Awards", file: "Miscellany_Padma_Awards" },
          { name: "Gallantry Awards", file: "Miscellany_Gallantry_Awards" },
          { name: "Recipients of the Bharatiya Jnanpith Award", file: "Miscellany_Recipients_of_the_Bharatiya_Jnanpith_Award" },
          { name: "Recipients of Dada Saheb Phalke Award", file: "Miscellany_Recipients_of_Dada_Saheb_Phalke_Award" },
          { name: "Nobel Prize", file: "Miscellany_Nobel_Prize" },
          { name: "Oscar/Academy Award (Motion-Picture Award)", file: "Miscellany_Oscar_Academy_Award_Motion_Picture_Award" },
          { name: "Grammy Award (American Music Award)", file: "Miscellany_Grammy_Award_American_Music_Award" },
          { name: "Booker Prize (British Literary Award)", file: "Miscellany_Booker_Prize_British_Literary_Award" },
          { name: "Ramon Magsaysay Award", file: "Miscellany_Ramon_Magsaysay_Award" },
          { name: "Gandhi Peace Prize", file: "Miscellany_Gandhi_Peace_Prize" },
          { name: "UNESCO Kalinga Prize", file: "Miscellany_UNESCO_Kalinga_Prize" },
          { name: "Important Books and Authors", file: "Miscellany_Important_Books_and_Authors" },
          { name: "Important Committees (India)", file: "Miscellany_Important_Committees_India" },
          { name: "Committees and Commissions", file: "Miscellany_Committees_and_Commissions" },
          { name: "Youth Affairs, Games and Sports", file: "Miscellany_Youth_Affairs_Games_and_Sports" },
          { name: "Olympic Games", file: "Miscellany_Olympic_Games" },
          { name: "Paralympics and Winter Olympics", file: "Miscellany_Paralympics_and_Winter_Olympics" },
          { name: "Commonwealth Games", file: "Miscellany_Commonwealth_Games" },
          { name: "Asian Games", file: "Miscellany_Asian_Games" },
          { name: "SAF Games", file: "Miscellany_SAF_Games" },
          { name: "Cricket", file: "Miscellany_Cricket" },
          { name: "Football", file: "Miscellany_Football" },
          { name: "Hockey", file: "Miscellany_Hockey" },
          { name: "Some Important Facts", file: "Miscellany_Some_Important_Facts" },
          { name: "Cups and Trophies", file: "Miscellany_Cups_and_Trophies" },
          { name: "Famous Stadia and Sports", file: "Miscellany_Famous_Stadia_and_Sports" },
          { name: "National Games and Sports (World)", file: "Miscellany_National_Games_and_Sports_World" },
          { name: "Court or Field Associated with Sports", file: "Miscellany_Court_or_Field_Associated_with_Sports" },
          { name: "Number of Players in Some Popular Sports", file: "Miscellany_Number_of_Players_in_Some_Popular_Sports" },
          { name: "Nicknames of Eminent Players", file: "Miscellany_Nicknames_of_Eminent_Players" },
          { name: "Eminent Sportspersons (India)", file: "Miscellany_Eminent_Sportspersons_India" },
          { name: "Eminent International Players (Female)", file: "Miscellany_Eminent_International_Players_Female" },
          { name: "Eminent International Players (Male)", file: "Miscellany_Eminent_International_Players_Male" },
          { name: "Special Awards in Sports", file: "Miscellany_Special_Awards_in_Sports" },
          { name: "Miscellaneous", file: "Miscellany_Miscellaneous" }
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
          { name: "Introduction", file: "Computer_Introduction" },
          { name: "Five Generations of Computer", file: "Computer_Five_Generations_of_Computer" },
          { name: "Programming Languages of Different Generations", file: "Computer_Programming_Languages_of_Different_Generations" },
          { name: "Some Important Facts Related to Computers", file: "Computer_Some_Important_Facts_Related_to_Computers" },
          { name: "Units of Data Measurement", file: "Computer_Units_of_Data_Measurement" },
          { name: "Important Keyboard Shortcuts (Commands)", file: "Computer_Important_Keyboard_Shortcuts_Commands" },
          { name: "Glossary", file: "Computer_Glossary" },
          { name: "Abbreviations Associated with Computer", file: "Computer_Abbreviations_Associated_with_Computer" },
          { name: "Some Memorable Facts", file: "Computer_Some_Memorable_Facts" },
          { name: "Some Important Initiatives of the Government", file: "Computer_Some_Important_Initiatives_of_the_Government" }
        ]
      }
    ]
  },

];