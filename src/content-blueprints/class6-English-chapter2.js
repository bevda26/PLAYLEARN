// EduQuest Chapter Module: Friendship (Class 6 English)
export const chapterModule = {
  // === CHAPTER METADATA ===
  metadata: {
    id: "class6_english_friendship_unit2",
    title: "Friendship",
    class: 6,
    stream: "general",
    subjects: ["english", "language_arts", "social_emotional_learning"],
    description: "Explore the beautiful bonds of friendship through heartwarming stories and poetry, learning about loyalty, kindness, and what makes true friends.",
    estimatedTime: 240, // minutes
    difficulty: "intermediate",
    prerequisites: ["basic_reading_comprehension", "simple_sentence_construction"],
    tags: ["friendship", "relationships", "stories", "poetry", "values", "empathy", "communication"],
    curriculumAlignment: {
      ncert: "Class 6 English Poorvi Unit 2",
      learningOutcomes: [
        "Understand the concept of true friendship through stories",
        "Analyze character relationships and motivations", 
        "Express thoughts and feelings about friendship",
        "Develop vocabulary related to emotions and relationships",
        "Practice reading comprehension and critical thinking",
        "Create original content about friendship experiences"
      ]
    }
  },

  // === QUEST ARC STRUCTURE ===
  questArc: {
    // QUEST 1: INVESTIGATION QUEST
    friendshipDetectives: {
      id: "friendship_detective_quest",
      title: "The Friendship Detectives",
      subjects: ["english", "social_emotional_learning"],
      description: "Become a detective investigating what makes friendships special by exploring three wonderful stories about unlikely friends, magical chairs, and heartfelt prayers.",
      type: "investigation",
      rewards: {
        xp: 80,
        items: ["detective_badge", "friendship_journal", "story_compass"],
        unlocks: ["character_analysis_tools", "emotion_detector"]
      },
      prerequisites: [],
      activities: [
        {
          type: "interactive_story_exploration",
          content: {
            prompt: "Read 'The Unlikely Best Friends' and investigate the friendship between Gajaraj and Buntee. What clues show they are true friends?",
            story_segments: [
              {
                title: "Gajaraj's Loneliness",
                text: "Despite royal comforts, Gajaraj was sad because he had no friends...",
                investigation_points: ["isolation", "longing_for_companionship", "kindness_to_stranger"]
              },
              {
                title: "Buntee's Arrival", 
                text: "A tired and hungry dog strayed into the stable...",
                investigation_points: ["sharing_food", "showing_compassion", "accepting_differences"]
              },
              {
                title: "Growing Bond",
                text: "They played together, shared baths, and enjoyed each other's company...",
                investigation_points: ["mutual_enjoyment", "shared_activities", "loyalty"]
              },
              {
                title: "Separation and Reunion",
                text: "When separated, both refused to eat until reunited...",
                investigation_points: ["true_friendship_test", "sacrifice", "dedication"]
              }
            ],
            detective_questions: [
              "What made their friendship 'unlikely'?",
              "How did they show care for each other?",
              "What happened when they were separated?",
              "Who else became friends in the story?"
            ]
          },
          uiComponent: "StoryInvestigationPanel"
        },
        {
          type: "character_analysis",
          content: {
            prompt: "Analyze the characters in 'The Chair' story. What kind of person is Mario, and how do his friends reveal their true nature?",
            characters: [
              {
                name: "Mario",
                traits_to_discover: ["boastful", "determined", "brave", "learning"],
                evidence_points: ["showed off about friends", "wouldn't give up", "took grandfather's challenge"]
              },
              {
                name: "Guneet, Asma, Deepa", 
                traits_to_discover: ["loyal", "caring", "helpful", "true_friends"],
                evidence_points: ["held Mario up", "prevented his fall", "stayed loyal"]
              },
              {
                name: "Other classmates",
                traits_to_discover: ["fair_weather_friends", "unsupportive"],
                evidence_points: ["laughed at Mario", "enjoyed his struggles", "didn't help"]
              }
            ],
            analysis_questions: [
              "How did Mario's attitude about friendship change?",
              "What was the 'magic' of the chair?",
              "How did the grandfather teach Mario about true friendship?"
            ]
          },
          uiComponent: "CharacterAnalysisWorksheet"
        }
      ]
    },

    // QUEST 2: EXPERIMENT QUEST
    friendshipLaboratory: {
      id: "friendship_creative_lab",
      title: "The Friendship Laboratory", 
      subjects: ["english", "language_arts"],
      description: "Experiment with language, creativity, and expression as you write poems, create dialogues, and explore the many ways to express friendship.",
      type: "experiment",
      rewards: {
        xp: 100,
        items: ["poet_quill", "dialogue_script", "emotion_palette"],
        unlocks: ["creative_writing_tools", "voice_expression_studio"]
      },
      activities: [
        {
          type: "poetry_creation",
          content: {
            prompt: "Create your own friendship prayer or poem using the structure from 'A Friend's Prayer'. Express what friendship means to you.",
            poem_framework: {
              stanza_1: "What I wish for my friendships...",
              stanza_2: "How I want to treat my friends...", 
              stanza_3: "What I hope to learn from friendship...",
              stanza_4: "My promise to my friends..."
            },
            vocabulary_bank: [
              "loyal", "caring", "trustworthy", "supportive", "understanding",
              "blessed", "grateful", "cherished", "devoted", "genuine"
            ],
            rhyme_helpers: [
              "friend/depend", "care/share", "true/you", "heart/part", "stay/way"
            ]
          },
          uiComponent: "PoetryCreationStudio"
        },
        {
          type: "dialogue_writing",
          content: {
            prompt: "Write a conversation between two friends in different situations. Practice using proper dialogue punctuation and expressing emotions through words.",
            scenarios: [
              {
                situation: "Making up after an argument",
                characters: ["Friend A", "Friend B"],
                emotions: ["regret", "forgiveness", "understanding"]
              },
              {
                situation: "Sharing exciting news",
                characters: ["Friend A", "Friend B"],
                emotions: ["excitement", "happiness", "support"]
              },
              {
                situation: "Helping with a problem",
                characters: ["Friend A", "Friend B"], 
                emotions: ["concern", "empathy", "encouragement"]
              }
            ],
            dialogue_tips: [
              "Use quotation marks around spoken words",
              "Start a new paragraph for each speaker",
              "Show emotions through tone and word choice",
              "Include actions and expressions in between dialogue"
            ]
          },
          uiComponent: "DialogueWritingInterface"
        }
      ]
    },

    // QUEST 3: CHALLENGE QUEST
    friendshipChampionship: {
      id: "friendship_comprehension_challenge",
      title: "The Friendship Championship",
      subjects: ["english"],
      description: "Test your reading comprehension, vocabulary, and language skills in exciting challenges based on the friendship stories.",
      type: "challenge",
      rewards: {
        xp: 120,
        items: ["comprehension_crown", "vocabulary_shield", "grammar_sword"],
        unlocks: ["advanced_reading_challenges", "language_mastery_arena"]
      },
      activities: [
        {
          type: "comprehension_tournament",
          content: {
            prompt: "Answer challenging questions about the three texts to prove your understanding.",
            rounds: [
              {
                name: "Detail Detective Round",
                questions: [
                  {
                    text: "Why did Gajaraj push food toward the dog?",
                    options: ["He was full", "He wanted to be kind", "He didn't like the food", "He was playing"],
                    correct: 1,
                    explanation: "Gajaraj saw the visitor was tired and hungry and showed compassion by sharing his food."
                  },
                  {
                    text: "What did Mario's grandfather give him from the attic?",
                    options: ["A real chair", "An invisible chair", "A magic book", "A friendship test"],
                    correct: 1,
                    explanation: "The grandfather gave Mario an invisible chair to test who his real friends were."
                  }
                ]
              },
              {
                name: "Inference Investigation Round", 
                questions: [
                  {
                    text: "What can we infer about the mahout's character?",
                    options: ["He was cruel", "He was kind but not a friend", "He didn't care about Gajaraj", "He was jealous"],
                    correct: 1,
                    explanation: "The text says he was kind and a good caretaker, but not a friend to Gajaraj."
                  }
                ]
              }
            ]
          },
          uiComponent: "ComprehensionTournamentArena"
        },
        {
          type: "vocabulary_mastery",
          content: {
            prompt: "Master the vocabulary from the friendship stories through various challenges.",
            word_categories: {
              emotions: ["blessed", "delighted", "relieved", "grateful", "satisfied"],
              actions: ["strayed", "accompanied", "experienced", "realise", "convey"],
              descriptions: ["invisible", "determined", "amazing", "slight", "readily"]
            },
            challenges: [
              {
                type: "definition_match",
                instruction: "Match words with their meanings"
              },
              {
                type: "context_completion",
                instruction: "Complete sentences using the correct vocabulary word"
              },
              {
                type: "synonym_antonym",
                instruction: "Find words with similar and opposite meanings"
              }
            ]
          },
          uiComponent: "VocabularyMasteryArena"
        }
      ]
    },

    // QUEST 4: MASTERY QUEST
    friendshipAmbassadors: {
      id: "friendship_teaching_quest",
      title: "Friendship Ambassadors",
      subjects: ["english", "social_emotional_learning"],
      description: "Demonstrate your mastery by teaching others about friendship, creating presentations, and helping younger students understand these beautiful stories.",
      type: "mastery",
      rewards: {
        xp: 150,
        items: ["ambassador_badge", "teaching_wand", "wisdom_scroll"],
        unlocks: ["mentor_privileges", "story_creation_studio", "peer_tutoring_tools"]
      },
      activities: [
        {
          type: "story_retelling",
          content: {
            prompt: "Retell one of the friendship stories to a younger audience, adapting your language and adding visual elements to help them understand.",
            story_choices: [
              {
                title: "The Unlikely Best Friends",
                key_points: ["Gajaraj's loneliness", "Meeting Buntee", "Their friendship activities", "Separation and reunion", "Lesson about friendship"],
                adaptation_tips: ["Use simple words", "Add sound effects", "Include emotions", "Ask questions"]
              },
              {
                title: "The Chair",
                key_points: ["Mario's boasting", "Grandfather's challenge", "The invisible chair test", "Discovery of true friends", "Lesson learned"],
                adaptation_tips: ["Make it interactive", "Explain the 'magic'", "Emphasize the lesson", "Connect to their experiences"]
              }
            ],
            presentation_elements: [
              "Clear introduction",
              "Engaging storytelling voice", 
              "Visual aids or props",
              "Questions for audience",
              "Summary of the lesson"
            ]
          },
          uiComponent: "StorytellingStudio"
        },
        {
          type: "friendship_workshop",
          content: {
            prompt: "Design and lead a workshop teaching others about friendship qualities using examples from the stories.",
            workshop_sections: [
              {
                title: "What Makes a Good Friend?",
                activities: ["Character trait analysis", "Examples from stories", "Personal sharing"]
              },
              {
                title: "Friendship Challenges",
                activities: ["Problem scenarios", "Solutions discussion", "Role-playing"]
              },
              {
                title: "Being a Better Friend",
                activities: ["Self-reflection", "Goal setting", "Action planning"]
              }
            ],
            materials_needed: [
              "Story excerpts for examples",
              "Character trait cards",
              "Scenario situations",
              "Reflection worksheets"
            ]
          },
          uiComponent: "WorkshopPlanningInterface"
        }
      ]
    },

    // QUEST 5: BOSS QUEST
    grandFriendshipSaga: {
      id: "friendship_saga_creation",
      title: "The Grand Friendship Saga",
      subjects: ["english", "language_arts", "social_emotional_learning"],
      description: "Create your ultimate friendship adventure by combining everything you've learned into an original story, complete with characters, challenges, and lessons about true friendship.",
      type: "boss",
      rewards: {
        xp: 200,
        items: ["saga_master_crown", "legendary_pen", "friendship_codex", "story_creator_badge"],
        unlocks: ["advanced_creative_writing", "story_publishing_platform", "peer_review_system"]
      },
      activities: [
        {
          type: "original_story_creation",
          content: {
            prompt: "Write your own friendship story that includes characters, conflict, resolution, and a clear lesson about friendship.",
            story_structure: {
              setup: {
                elements: ["Main character introduction", "Setting description", "Initial situation"],
                requirements: ["At least two characters", "Clear setting", "Engaging opening"]
              },
              conflict: {
                elements: ["Friendship challenge", "Misunderstanding or test", "Character emotions"],
                requirements: ["Realistic problem", "Character growth opportunity", "Emotional depth"]
              },
              resolution: {
                elements: ["Problem solving", "Friendship strengthened", "Lesson learned"],
                requirements: ["Satisfying conclusion", "Clear message", "Character development"]
              }
            },
            writing_tools: [
              "Character development sheet",
              "Plot planning template",
              "Dialogue practice space",
              "Vocabulary integration checklist"
            ]
          },
          uiComponent: "AdvancedStoryCreator"
        },
        {
          type: "multimedia_presentation",
          content: {
            prompt: "Create a multimedia presentation of your friendship saga including illustrations, audio narration, and interactive elements.",
            components: [
              {
                type: "visual_elements",
                options: ["Character drawings", "Scene illustrations", "Story map", "Comic strip format"]
              },
              {
                type: "audio_elements", 
                options: ["Narrated reading", "Character voices", "Sound effects", "Background music"]
              },
              {
                type: "interactive_elements",
                options: ["Reader choices", "Character interviews", "Friendship quiz", "Discussion questions"]
              }
            ],
            presentation_rubric: {
              creativity: "Original and imaginative content",
              technical_quality: "Well-executed multimedia elements",
              story_structure: "Clear beginning, middle, and end",
              friendship_theme: "Strong message about friendship",
              audience_engagement: "Keeps audience interested and involved"
            }
          },
          uiComponent: "MultimediaStoryPresenter"
        }
      ]
    }
  },

  // === ASSESSMENT LEVELS ===
  assessmentLevels: {
    level1_recall: {
      type: "knowledge_check",
      description: "Basic comprehension and vocabulary recall",
      questions: [
        {
          id: "q1_character_names",
          question: "What are the names of Mario's three true friends in 'The Chair'?",
          type: "multiple_choice",
          options: ["Rahul, Priya, Amit", "Guneet, Asma, Deepa", "Ravi, Sita, Krishna", "Dev, Maya, Arjun"],
          correct: "Guneet, Asma, Deepa",
          explanation: "Guneet, Asma, and Deepa were the three friends who held Mario up when he sat on the invisible chair.",
          xp_reward: 15,
          difficulty: "easy"
        },
        {
          id: "q2_elephant_name",
          question: "What was the name of the elephant in 'The Unlikely Best Friends'?",
          type: "text_input",
          correct: "Gajaraj",
          explanation: "Gajaraj was the royal elephant who lived in the best booth of the royal stables.",
          xp_reward: 15,
          difficulty: "easy"
        }
      ],
      rewards: { xp: 50, items: ["memory_gem", "recall_badge"] }
    },

    level2_understanding: {
      type: "comprehension_demonstration",
      description: "Understanding themes, character motivations, and story connections",
      challenges: [
        {
          id: "c1_theme_explanation",
          challenge: "Explain the main message about friendship from any one of the three texts. Use examples from the story to support your explanation.",
          type: "extended_response",
          rubric: {
            clear_theme_identification: "Student identifies the main friendship lesson",
            textual_evidence: "Uses specific examples from the chosen text", 
            explanation_quality: "Clearly connects evidence to theme",
            personal_connection: "Relates theme to own understanding of friendship"
          },
          xp_reward: 30,
          difficulty: "medium"
        },
        {
          id: "c2_character_motivation",
          challenge: "Why did the farmer let Buntee go back to Gajaraj? What does this show about the farmer's character?",
          type: "analysis_response",
          sample_answer: "The farmer saw that Buntee was not eating and missing his friend. He realized that true friendship was more important than ownership, showing he was kind and understanding.",
          evaluation_points: ["Understanding of character motivation", "Recognition of farmer's kindness", "Connection to friendship theme"],
          xp_reward: 25,
          difficulty: "medium"
        }
      ],
      rewards: { xp: 75, items: ["understanding_badge", "theme_detector"] }
    },

    level3_application: {
      type: "skill_application",
      description: "Applying friendship lessons to new situations and creative contexts", 
      scenarios: [
        {
          id: "s1_friendship_advice",
          scenario: "Your friend is feeling left out because other classmates are not including them in games. Using lessons from the friendship stories, what advice would you give?",
          type: "problem_solving",
          evaluation_criteria: [
            "References specific examples from the texts",
            "Offers practical, kind advice",
            "Shows understanding of inclusion and empathy",
            "Demonstrates application of friendship principles"
          ],
          xp_reward: 35,
          difficulty: "medium-hard"
        },
        {
          id: "s2_creative_adaptation",
          scenario: "Rewrite the ending of 'The Chair' story. What if Mario's grandfather had used a different test for friendship? Create your own friendship test.",
          type: "creative_application",
          requirements: [
            "Maintains story characters and setting",
            "Creates original friendship test concept", 
            "Shows clear understanding of true vs. superficial friendship",
            "Includes logical consequences and character reactions"
          ],
          xp_reward: 40,
          difficulty: "hard"
        }
      ],
      rewards: { xp: 100, items: ["application_badge", "wisdom_stone", "creative_key"] }
    },

    level4_analysis: {
      type: "critical_analysis",
      description: "Analyzing literary elements, comparing texts, and evaluating character choices",
      projects: [
        {
          id: "p1_text_comparison",
          project: "Compare and contrast how friendship is portrayed in 'The Unlikely Best Friends' and 'The Chair'. What are the similarities and differences in the friendship lessons?",
          type: "comparative_analysis",
          analysis_framework: {
            similarities: ["Both show tests of true friendship", "Both involve sacrifice", "Both have happy endings"],
            differences: ["Animal vs. human friendship", "Natural vs. planned test", "Different types of loyalty"],
            deeper_themes: ["Acceptance of differences", "Loyalty under pressure", "Recognition of true friends"]
          },
          rubric: {
            comparison_depth: "Identifies multiple points of comparison",
            textual_evidence: "Uses specific examples from both texts",
            insight_quality: "Shows deeper understanding beyond surface similarities",
            organization: "Clear structure and logical flow"
          },
          xp_reward: 50,
          difficulty: "hard"
        }
      ],
      rewards: { xp: 125, items: ["analyst_badge", "comparison_lens", "insight_crystal"] }
    },

    level5_synthesis: {
      type: "creative_synthesis",
      description: "Creating original content that synthesizes friendship themes and personal insights",
      creations: [
        {
          id: "cr1_friendship_guide",
          creation: "Create a 'Friendship Survival Guide' for students your age, incorporating lessons from all three texts plus your own experiences and insights.",
          type: "original_composition",
          components: [
            "Introduction explaining what friendship means",
            "Section on recognizing true friends (using 'The Chair' lessons)",
            "Section on being inclusive and kind (using 'Unlikely Friends' lessons)", 
            "Section on expressing appreciation (using 'Friend's Prayer' lessons)",
            "Personal anecdotes and practical tips",
            "Creative elements like illustrations or quotes"
          ],
          evaluation_criteria: {
            content_integration: "Effectively uses all three source texts",
            originality: "Includes personal insights and experiences",
            practical_value: "Offers useful, actionable advice",
            creativity: "Engaging presentation and original elements",
            audience_awareness: "Appropriate for target age group"
          },
          xp_reward: 75,
          difficulty: "expert"
        }
      ],
      rewards: { xp: 150, items: ["synthesis_crown", "creation_scepter", "master_storyteller_title"] }
    }
  },

  // === SOCIAL INTEGRATION ===
  socialIntegration: {
    studyGroups: {
      enabled: true,
      maxSize: 4,
      activities: [
        "collaborative_story_analysis",
        "group_poetry_reading_and_discussion",
        "friendship_scenario_role_playing",
        "peer_editing_and_feedback_sessions",
        "group_storytelling_projects"
      ],
      roles: ["Discussion Leader", "Text Analyst", "Creative Director", "Presentation Coordinator"],
      safetyFeatures: [
        "teacher_supervised_discussions",
        "positive_communication_guidelines", 
        "respectful_feedback_protocols",
        "inclusive_participation_rules"
      ]
    },

    peerTutoring: {
      enabled: true,
      matchingCriteria: ["reading_level_compatibility", "complementary_strengths"],
      activities: [
        "reading_comprehension_practice",
        "vocabulary_building_games",
        "creative_writing_support",
        "story_retelling_practice"
      ],
      benefits: ["reinforced_learning_for_tutors", "personalized_support_for_tutees", "social_skill_development"]
    },

    achievements: {
      shareable: [
        "first_story_analysis_complete",
        "original_poem_created",
        "friendship_lesson_mastered",
        "peer_helper_recognition",
        "creative_story_published",
        "empathy_champion_badge"
      ],
      classWide: [
        "most_thoughtful_responses",
        "best_creative_writing",
        "most_helpful_peer_tutor",
        "strongest_friendship_advocate"
      ]
    }
  },

  // === PARENT ANALYTICS ===
  parentAnalytics: {
    progressTracking: [
      {
        metric: "reading_comprehension_growth",
        description: "Improvement in understanding story elements and themes",
        visualization: "line_graph_with_milestone_markers"
      },
      {
        metric: "vocabulary_development",
        description: "New words learned and correctly used in context",
        visualization: "expanding_word_cloud_over_time"
      },
      {
        metric: "creative_expression_quality",
        description: "Development in creative writing and original thinking",
        visualization: "portfolio_showcase_with_rubric_scores"
      },
      {
        metric: "social_emotional_insights",
        description: "Understanding and application of friendship concepts",
        visualization: "empathy_development_tracker"
      }
    ],

    learningInsights: [
      {
        insight: "favorite_story_elements",
        description: "Which aspects of stories most engage your child",
        homeActivities: ["Read similar stories together", "Discuss favorite characters", "Create family stories"]
      },
      {
        insight: "friendship_understanding_development",
        description: "How your child's understanding of friendship is growing",
        homeActivities: ["Discuss real friendship situations", "Practice empathy exercises", "Share family friendship stories"]
      },
      {
        insight: "creative_writing_strengths",
        description: "Areas where your child shows creative talent",
        homeActivities: ["Encourage journal writing", "Provide creative writing prompts", "Celebrate original stories"]
      }
    ],

    goalSetting: {
      availableGoals: [
        {
          type: "reading_fluency_goal",
          description: "Read stories with improved comprehension and expression",
          tracking: "oral_reading_assessments_and_comprehension_scores",
          rewards: "personalized_book_recommendations_and_reading_certificates"
        },
        {
          type: "friendship_application_goal", 
          description: "Apply friendship lessons in real-life situations",
          tracking: "reflection_journals_and_teacher_observations",
          rewards: "friendship_ambassador_recognition_and_leadership_opportunities"
        },
        {
          type: "creative_expression_goal",
          description: "Create original stories, poems, or presentations about friendship",
          tracking: "creative_project_portfolio_and_peer_feedback",
          rewards: "author_recognition_and_publishing_opportunities"
        }
      ]
    }
  },

  // === TEACHER TOOLS ===
  teacherTools: {
    classroomManagement: {
      discussionGuides: {
        enabled: true,
        topics: [
          "Understanding different types of friendship",
          "Recognizing kindness and empathy in stories",
          "Discussing character motivations and choices",
          "Connecting story themes to real life",
          "Exploring cultural aspects of friendship"
        ],
        questionBanks: [
          "literal_comprehension_questions",
          "inferential_thinking_prompts", 
          "critical_analysis_discussions",
          "personal_connection_reflections"
        ]
      },

      writingSupport: {
        enabled: true,
        scaffolds: [
          "story_structure_templates",
          "character_development_organizers",
          "dialogue_formatting_guides",
          "peer_editing_checklists"
        ],
        rubrics: [
          "creative_writing_assessment",
          "reading_comprehension_evaluation",
          "oral_presentation_scoring",
          "collaboration_skills_rubric"
        ]
      }
    },

    assessmentTools: {
      comprehensionChecks: {
        formative: ["exit_tickets", "quick_polls", "think_pair_share", "story_mapping"],
        summative: ["project_presentations", "portfolio_reviews", "performance_tasks"]
      },

      differentiationSupport: {
        readingLevels: ["below_grade_simplified_texts", "on_grade_standard_texts", "above_grade_enriched_texts"],
        learningStyles: ["visual_story_maps", "auditory_discussion_groups", "kinesthetic_role_playing"],
        languageSupport: ["vocabulary_preview", "cultural_context_explanations", "multilingual_resources"]
      }
    },

    parentCommunication: {
      progressReports: {
        automated: ["weekly_reading_progress", "assignment_completion_updates", "achievement_celebrations"],
        personalized: ["individual_growth_narratives", "specific_strength_recognition", "targeted_support_suggestions"]
      },

      homeExtension: {
        familyActivities: [
          "read_aloud_sessions_with_discussion_questions",
          "family_story_sharing_traditions",
          "friendship_reflection_conversations",
          "creative_writing_family_projects"
        ],
        resources: [
          "recommended_book_lists",
          "conversation_starter_guides",
          "creative_activity_suggestions",
          "positive_reinforcement_strategies"
        ]
      }
    }
  },

  // === GAME INTEGRATION ===
  gameIntegration: {
    phaserGames: [
      {
        file: "friendship_story_explorer.js",
        description: "Interactive story navigation with character dialogue and choice points",
        mechanics: ["point_and_click_exploration", "dialogue_trees", "character_interaction"],
        assets: ["story_backgrounds", "character_sprites", "dialogue_ui_elements"]
      },
      {
        file: "vocabulary_friendship_garden.js",
        description: "Plant and grow vocabulary words related to friendship and emotions",
        mechanics: ["word_matching", "garden_building", "progress_visualization"],
        assets: ["garden_environments", "word_seed_graphics", "growth_animations"]
      },
      {
        file: "creative_writing_studio.js",
        description: "Interactive writing environment with prompts, templates, and peer sharing",
        mechanics: ["text_input_interface", "template_selection", "peer_review_system"],
        assets: ["writing_interface_ui", "template_graphics", "inspiration_images"]
      },
      {
        file: "friendship_scenario_theater.js",
        description: "Role-playing scenarios where students practice friendship skills",
        mechanics: ["character_selection", "scenario_navigation", "choice_consequences"],
        assets: ["theater_backgrounds", "character_costumes", "scenario_props"]
      }
    ],

    threeJsEnvironments: [
      {
        file: "friendship_kingdom.glb",
        description: "3D world representing different friendship environments from the stories",
        areas: ["royal_stables", "school_classroom", "village_home", "prayer_garden"],
        optimization: "LOD_based_on_proximity"
      },
      {
        file: "story_library.glb", 
        description: "Interactive library where students can explore and create stories",
        features: ["book_selection_interface", "reading_nooks", "writing_desks", "presentation_stage"],
        optimization: "progressive_loading_by_section"
      }
    ],

    assetDependencies: [
      {
        category: "audio",
        files: [
          "gentle_background_music.mp3",
          "story_narration_voices.wav",
          "friendship_celebration_sounds.wav",
          "writing_ambience.mp3"
        ]
      },
      {
        category: "visual",
        files: [
          "friendship_themed_ui_elements.png",
          "character_emotion_expressions.png", 
          "story_illustration_assets.png",
          "writing_tool_icons.png"
        ]
      }
    ]
  },

  // === ACCESSIBILITY ===
  accessibility: {
    readingSupport: [
      {
        feature: "text_to_speech",
        description: "All text content can be read aloud with adjustable speed",
        implementation: "web_speech_api_with_natural_voices"
      },
      {
        feature: "dyslexia_friendly_fonts",
        description: "Alternative font options for students with reading difficulties",
        implementation: "OpenDyslexic_and_other_accessible_font_choices"
      },
      {
        feature: "reading_level_adaptation",
        description: "Text complexity can be adjusted for different reading abilities",
        implementation: "simplified_vocabulary_and_sentence_structure_options"
      }
    ],

    visualSupport: [
      {
        feature: "high_contrast_themes",
        description: "Enhanced visual contrast for better readability",
        implementation: "multiple_high_contrast_color_schemes"
      },
      {
        feature: "text_size_scaling",
        description: "Adjustable text size from 12px to 28px",
        implementation: "dynamic_font_scaling_with_layout_preservation"
      },
      {
        feature: "visual_story_supports",
        description: "Image illustrations and graphic organizers for comprehension",
        implementation: "story_mapping_visuals_and_character_relationship_diagrams"
      }
    ],

    languageSupport: [
      {
        feature: "multilingual_vocabulary_help",
        description: "Definitions and translations for complex words",
        implementation: "contextual_glossary_with_multiple_language_support"
      },
      {
        feature: "cultural_context_explanations",
        description: "Background information for cultural references in stories",
        implementation: "expandable_context_boxes_with_relevant_explanations"
      }
    ],

    interactionSupport: [
      {
        feature: "keyboard_navigation",
        description: "Full functionality accessible via keyboard",
        implementation: "comprehensive_tab_order_and_keyboard_shortcuts"
      },
      {
        feature: "voice_input_options",
        description: "Speech-to-text for written responses",
        implementation: "voice_recognition_for_creative_writing_and_responses"
      }
    ]
  },

  // === OFFLINE SUPPORT ===
  offlineSupport: {
    downloadableContent: [
      {
        type: "story_texts",
        description: "Complete text of all three friendship stories for offline reading",
        size_estimate: "2MB",
        sync_priority: "high"
      },
      {
        type: "vocabulary_exercises",
        description: "Word games and vocabulary practice activities",
        size_estimate: "3MB",
        sync_priority: "high"
      },
      {
        type: "writing_templates",
        description: "Story structure templates and creative writing prompts",
        size_estimate: "1MB", 
        sync_priority: "medium"
      },
      {
        type: "audio_content",
        description: "Story narrations and pronunciation guides",
        size_estimate: "15MB",
        sync_priority: "medium"
      }
    ],

    offlineActivities: [
      {
        activity: "story_comprehension_practice",
        description: "Question sets and activities for each story that work without internet",
        functionality: "complete_with_immediate_feedback"
      },
      {
        activity: "creative_writing_workspace",
        description: "Offline writing environment with prompts and templates",
        functionality: "full_text_editing_with_auto_save"
      },
      {
        activity: "vocabulary_review_games",
        description: "Word matching and definition games for key vocabulary",
        functionality: "interactive_games_with_progress_tracking"
      }
    ],

    syncStrategy: {
      priority_order: ["completed_assignments", "creative_writing_drafts", "progress_data", "achievement_unlocks"],
      conflict_resolution: "timestamp_based_with_user_choice_for_creative_work",
      bandwidth_optimization: "compressed_text_only_sync_with_media_on_demand"
    }
  }
};

// === UTILITY FUNCTIONS ===
export const friendshipChapterUtils = {
  getStoryContent: (storyTitle) => {
    const storyMap = {
      "The Unlikely Best Friends": {
        theme: "acceptance_of_differences_and_loyalty",
        characters: ["Gajaraj", "Buntee", "Mahout", "Farmer"],
        setting: "royal_stables_and_village",
        moral: "true_friendship_transcends_differences"
      },
      "A Friend's Prayer": {
        theme: "expressing_gratitude_and_commitment_to_friendship",
        format: "prayer_poem",
        key_concepts: ["blessing", "support", "acceptance", "understanding"],
        moral: "friendship_requires_active_care_and_acceptance"
      },
      "The Chair": {
        theme: "testing_and_recognizing_true_friendship",
        characters: ["Mario", "Guneet", "Asma", "Deepa", "Grandfather"],
        setting: "home_and_school",
        moral: "true_friends_support_you_in_difficult_times"
      }
    };
    return storyMap[storyTitle] || null;
  },

  generateDiscussionQuestions: (storyTitle, difficultyLevel) => {
    const questionBank = {
      "The Unlikely Best Friends": {
        basic: [
          "Who are the main characters in this story?",
          "Where does the story take place?",
          "What happens when Buntee and Gajaraj are separated?"
        ],
        intermediate: [
          "Why is their friendship called 'unlikely'?",
          "How do the characters show they care for each other?",
          "What role does the farmer play in the story?"
        ],
        advanced: [
          "What does this story teach us about accepting differences?",
          "How does the author show the strength of their friendship?",
          "What real-world connections can you make to this story?"
        ]
      },
      "The Chair": {
        basic: [
          "What did Mario's grandfather give him?",
          "Who helped Mario when he sat on the chair?",
          "What happened to the other students?"
        ],
        intermediate: [
          "Why did the grandfather create this test?",
          "What did Mario learn about friendship?",
          "How did Mario's attitude change?"
        ],
        advanced: [
          "Is this a fair test of friendship? Why or why not?",
          "What other ways could someone test friendship?",
          "How does this story relate to real-life situations?"
        ]
      }
    };

    return questionBank[storyTitle]?.[difficultyLevel] || [];
  },

  createWritingPrompts: (type, studentLevel) => {
    const prompts = {
      creative_story: {
        beginner: [
          "Write about a time you helped a friend",
          "Describe your best friend and why they're special",
          "Create a story about two very different animals becoming friends"
        ],
        intermediate: [
          "Write a story where friendship is tested but survives",
          "Create a modern version of one of the friendship stories",
          "Write about a friendship that changed you"
        ],
        advanced: [
          "Write a story exploring the theme 'true friendship requires sacrifice'",
          "Create a complex story with multiple characters showing different types of friendship",
          "Write a story that challenges common ideas about friendship"
        ]
      },
      poetry: {
        beginner: [
          "Write a simple poem about what makes a good friend",
          "Create an acrostic poem using the word FRIEND",
          "Write a poem thanking your best friend"
        ],
        intermediate: [
          "Write a poem in the style of 'A Friend's Prayer'",
          "Create a poem about overcoming a friendship challenge",
          "Write a poem comparing friendship to something in nature"
        ],
        advanced: [
          "Write a sonnet about the complexity of friendship",
          "Create a narrative poem telling a friendship story",
          "Write a poem exploring different cultural perspectives on friendship"
        ]
      }
    };

    return prompts[type]?.[studentLevel] || [];
  },

  assessStudentResponse: (response, criteria, rubricType) => {
    // Simplified assessment framework - in practice would use more sophisticated NLP
    const rubrics = {
      comprehension: {
        criteria: ["accuracy", "completeness", "textual_evidence", "insight"],
        levels: ["beginning", "developing", "proficient", "advanced"]
      },
      creative_writing: {
        criteria: ["creativity", "organization", "language_use", "theme_development"],
        levels: ["emerging", "developing", "proficient", "exemplary"]
      },
      discussion: {
        criteria: ["participation", "listening", "respectful_communication", "depth_of_thinking"],
        levels: ["minimal", "developing", "consistent", "exceptional"]
      }
    };

    return {
      overall_score: "proficient", // Would be calculated based on actual response
      criteria_scores: criteria.reduce((acc, criterion) => {
        acc[criterion] = "developing"; // Would be assessed individually
        return acc;
      }, {}),
      feedback: "Great effort! Focus on providing more specific examples from the text.",
      next_steps: ["Practice finding evidence in text", "Work on explaining connections"]
    };
  },

  generateParentReport: (studentId, timeframe) => {
    // Generate comprehensive parent insights
    return {
      readingProgress: {
        comprehension_level: "grade_appropriate",
        vocabulary_growth: "15_new_words_mastered",
        fluency_improvement: "increased_expression_and_pace"
      },
      socialEmotionalLearning: {
        empathy_development: "shows_increased_understanding_of_others_feelings",
        friendship_application: "applies_story_lessons_to_real_situations",
        communication_skills: "improved_ability_to_express_thoughts_about_relationships"
      },
      creativeDevelopment: {
        writing_growth: "more_detailed_and_imaginative_stories",
        oral_expression: "confident_participation_in_discussions",
        critical_thinking: "asks_thoughtful_questions_about_characters_and_situations"
      },
      recommendedActivities: [
        "Continue reading friendship-themed books together",
        "Discuss real friendship situations using story examples",
        "Encourage creative writing about personal experiences",
        "Practice empathy through role-playing activities"
      ]
    };
  }
};

// Export utility functions for platform integration
export default chapterModule;
        