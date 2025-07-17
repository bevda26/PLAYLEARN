// EduQuest Chapter Module: A Bottle of Dew
// Grade 6 English - Unit 1: Fables and Folk Tales

export const chapterModule = {
  // === CHAPTER METADATA ===
  metadata: {
    id: "class6_english_bottle_of_dew",
    title: "A Bottle of Dew",
    class: 6,
    stream: "general",
    subjects: ["english", "literature", "language_arts"],
    description: "Explore the timeless folk tale about Rama Natha's journey from seeking magic solutions to discovering the value of hard work through an engaging story adventure.",
    prerequisites: ["basic_reading_comprehension", "vocabulary_building"],
    estimatedTime: 180, // minutes
    difficulty: "intermediate",
    tags: ["folk_tales", "moral_stories", "hard_work", "wisdom", "character_development"],
    curriculumAlignment: {
      ncert: "Class 6 English Unit 1 - Fables and Folk Tales",
      learningOutcomes: [
        "Understand the moral lesson about hard work versus seeking shortcuts",
        "Analyze character development and motivations in folk tales",
        "Develop vocabulary related to agriculture, magic, and perseverance",
        "Practice reading comprehension and inference skills",
        "Explore themes of wisdom, deception, and personal growth"
      ]
    }
  },

  // === QUEST ARC STRUCTURE ===
  questArc: {
    // QUEST 1: VOCABULARY DISCOVERY QUEST
    vocabularyDiscoveryQuest: {
      id: "vocabulary_exploration_adventure",
      title: "The Magical Vocabulary Quest",
      subjects: ["english", "language_arts"],
      description: "Begin your journey by discovering the magical vocabulary that will unlock the secrets of Rama Natha's story.",
      type: "investigation",
      rewards: {
        xp: 75,
        items: ["vocabulary_scroll", "definition_gem", "language_compass"],
        unlocks: ["story_portal", "character_gallery"]
      },
      prerequisites: [],
      activities: [
        {
          type: "interactive_vocabulary",
          content: {
            prompt: "Match the magical words with their meanings to unlock the story portal!",
            words: [
              {
                word: "plantation",
                options: ["a large farm where crops are grown", "a small garden", "a type of tree", "a magical potion"],
                correctAnswer: "a large farm where crops are grown",
                explanation: "A plantation is a large agricultural area where specific crops like bananas are grown."
              },
              {
                word: "sage",
                options: ["a young boy", "a wise and learned person", "a type of plant", "a magical creature"],
                correctAnswer: "a wise and learned person",
                explanation: "A sage is someone who is very wise, often sought for advice and guidance."
              },
              {
                word: "potion",
                options: ["a type of food", "a magical liquid with special powers", "a farming tool", "a place to live"],
                correctAnswer: "a magical liquid with special powers",
                explanation: "A potion is typically a magical or medicinal liquid mixture."
              },
              {
                word: "chant",
                options: ["to dance", "to sing or recite in a rhythmic way", "to work hard", "to sleep"],
                correctAnswer: "to sing or recite in a rhythmic way",
                explanation: "To chant means to speak or sing words in a repetitive, rhythmic manner."
              }
            ],
            feedback: {
              correct: "Excellent! You've unlocked another piece of the vocabulary puzzle!",
              incorrect: "Not quite right, but keep trying! Every attempt makes you wiser!"
            }
          },
          uiComponent: "InteractiveMatchingGame"
        },
        {
          type: "visual_word_association",
          content: {
            prompt: "Look at these pictures and choose the word that best matches each image.",
            imageWordPairs: [
              {
                imageDesc: "A worried-looking person with hands on head",
                options: ["happy", "worried", "excited", "sleeping"],
                correctAnswer: "worried",
                explanation: "The expression shows concern and anxiety, which means worried."
              },
              {
                imageDesc: "Rows of banana plants in a large field",
                options: ["garden", "forest", "plantation", "house"],
                correctAnswer: "plantation",
                explanation: "This shows a large agricultural area where bananas are grown commercially."
              },
              {
                imageDesc: "A wise old man in robes sitting under a tree",
                options: ["farmer", "sage", "child", "worker"],
                correctAnswer: "sage",
                explanation: "This depicts a wise, learned person who offers guidance and wisdom."
              }
            ],
            feedback: {
              correct: "Perfect! Your visual recognition skills are growing stronger!",
              incorrect: "Look more carefully at the details in the image and try again!"
            }
          },
          uiComponent: "VisualAssociationGame"
        }
      ]
    },

    // QUEST 2: STORY EXPLORATION QUEST  
    storyExplorationQuest: {
      id: "rama_natha_story_journey",
      title: "Rama Natha's Magical Journey",
      subjects: ["english", "literature"],
      description: "Follow Rama Natha through his fascinating journey from seeking magic to discovering the power of hard work.",
      type: "investigation",
      rewards: {
        xp: 100,
        items: ["story_map", "character_medallion", "wisdom_crystal"],
        unlocks: ["character_analysis_tools", "plot_diagram"]
      },
      prerequisites: ["vocabulary_exploration_adventure"],
      activities: [
        {
          type: "interactive_story_reading",
          content: {
            prompt: "Read along as the story unfolds and answer questions to show your understanding.",
            storySegments: [
              {
                title: "The Beginning - Rama Natha's Dream",
                text: "Rama Natha was the son of a rich landlord. His father left him large tracts of land when he died. But Rama Natha did not spend even one day looking after his land. This was because he had a funny idea—he believed there was a magic potion that could turn any object into gold.",
                questions: [
                  {
                    question: "Why didn't Rama Natha take care of his land?",
                    type: "multiple_choice",
                    options: [
                      "He was too lazy",
                      "He believed in finding a magic potion",
                      "He didn't know how to farm",
                      "He wanted to sell the land"
                    ],
                    correctAnswer: "He believed in finding a magic potion",
                    explanation: "Rama Natha was obsessed with finding a magical solution rather than doing honest work."
                  }
                ]
              },
              {
                title: "The Meeting - A Wise Sage Appears",
                text: "One day, a famous sage called Mahipati came to their town. Rama Natha became his follower and asked him about the potion. To his surprise the sage answered, 'Yes, in my travels in the Himalayas, I heard how you could make such a potion. But it is difficult.'",
                questions: [
                  {
                    question: "How did Rama Natha feel when the sage said he knew about the potion?",
                    type: "inference",
                    options: ["disappointed", "surprised and excited", "angry", "confused"],
                    correctAnswer: "surprised and excited",
                    explanation: "The text says 'To his surprise' showing he was amazed, and his eagerness suggests excitement."
                  }
                ]
              }
            ],
            feedback: {
              correct: "Wonderful! You're following the story perfectly!",
              incorrect: "Think about what the character is feeling and try again!"
            }
          },
          uiComponent: "InteractiveStoryReader"
        },
        {
          type: "character_analysis",
          content: {
            prompt: "Analyze the characters in our story. What makes them unique?",
            characters: [
              {
                name: "Rama Natha",
                traits: ["dreamy", "lazy", "wealthy", "gullible", "hopeful"],
                analysis: "A wealthy young man who prefers magical solutions to hard work",
                questions: [
                  {
                    question: "Which word best describes Rama Natha at the beginning?",
                    options: ["hardworking", "wise", "dreamy", "poor"],
                    correctAnswer: "dreamy",
                    explanation: "He dreams of magical solutions instead of facing reality."
                  }
                ]
              },
              {
                name: "Sage Mahipati",
                traits: ["wise", "clever", "helpful", "patient", "understanding"],
                analysis: "A wise teacher who uses clever methods to help Rama Natha learn",
                questions: [
                  {
                    question: "Why did the sage give Rama Natha the task of collecting dew?",
                    options: ["to punish him", "to teach him hard work", "to make him rich", "to waste his time"],
                    correctAnswer: "to teach him hard work",
                    explanation: "The sage wisely tricked Rama Natha into learning the value of honest labor."
                  }
                ]
              }
            ]
          },
          uiComponent: "CharacterAnalysisTool"
        }
      ]
    },

    // QUEST 3: COMPREHENSION CHALLENGE QUEST
    comprehensionChallengeQuest: {
      id: "understanding_mastery_challenge",
      title: "The Great Comprehension Challenge",
      subjects: ["english", "literature"],
      description: "Test your understanding of the story through exciting challenges and prove your mastery!",
      type: "challenge",
      rewards: {
        xp: 125,
        items: ["comprehension_crown", "insight_gem", "analysis_armor"],
        unlocks: ["advanced_questioning", "moral_exploration"]
      },
      prerequisites: ["rama_natha_story_journey"],
      activities: [
        {
          type: "sequence_ordering",
          content: {
            prompt: "Put these story events in the correct order to show you understand the plot!",
            events: [
              "Rama Natha meets the sage Mahipati",
              "Rama Natha starts planting banana trees and collecting dew",
              "The sage explains there is no magic potion",
              "Rama Natha inherits land but doesn't work on it",
              "The sage asks for 5 liters of dew to make the magic potion",
              "Rama Natha and his wife become wealthy from the banana plantation"
            ],
            correctOrder: [
              "Rama Natha inherits land but doesn't work on it",
              "Rama Natha meets the sage Mahipati", 
              "The sage asks for 5 liters of dew to make the magic potion",
              "Rama Natha starts planting banana trees and collecting dew",
              "The sage explains there is no magic potion",
              "Rama Natha and his wife become wealthy from the banana plantation"
            ],
            feedback: {
              correct: "Perfect! You understand the story sequence completely!",
              incorrect: "Think about what happened first, then what followed. Try again!"
            }
          },
          uiComponent: "SequenceOrderingGame"
        },
        {
          type: "inference_questions",
          content: {
            prompt: "Use your detective skills to answer these deeper questions about the story!",
            questions: [
              {
                question: "Why do you think the sage didn't tell Rama Natha directly that hard work was important?",
                type: "open_ended",
                sampleAnswer: "The sage knew that Rama Natha wouldn't listen to direct advice. By making him work for the 'magic potion,' Rama Natha learned the lesson through experience.",
                rubric: ["Shows understanding of character motivation", "Explains the sage's teaching method", "Demonstrates insight into human nature"]
              },
              {
                question: "What would have happened if the sage had simply given Rama Natha money instead?",
                type: "prediction",
                sampleAnswer: "Rama Natha would have spent the money and remained lazy. He wouldn't have learned the value of hard work or how to create lasting wealth.",
                rubric: ["Makes logical predictions", "Shows understanding of character", "Connects to the moral lesson"]
              }
            ]
          },
          uiComponent: "InferenceQuestionInterface"
        }
      ]
    },

    // QUEST 4: MORAL WISDOM QUEST
    moralWisdomQuest: {
      id: "wisdom_and_morals_exploration",
      title: "The Academy of Life Lessons",
      subjects: ["english", "literature", "character_education"],
      description: "Explore the deeper meanings and moral lessons of the story, then share your wisdom with others!",
      type: "mastery",
      rewards: {
        xp: 150,
        items: ["wisdom_scroll", "teacher_badge", "moral_compass"],
        unlocks: ["story_creation_tools", "peer_teaching_mode"]
      },
      prerequisites: ["understanding_mastery_challenge"],
      activities: [
        {
          type: "moral_exploration",
          content: {
            prompt: "Discover the important life lessons hidden in this beautiful story!",
            morals: [
              {
                lesson: "Hard work brings lasting success",
                evidence: "Rama Natha became truly wealthy only after working on his plantation",
                application: "In real life, success comes from consistent effort, not shortcuts",
                questions: [
                  {
                    question: "Can you think of a time when hard work helped you achieve something?",
                    type: "personal_reflection",
                    guidance: "Think about learning a skill, completing a project, or achieving a goal"
                  }
                ]
              },
              {
                lesson: "Wise teachers use clever methods",
                evidence: "The sage tricked Rama Natha into working hard for his own good",
                application: "Sometimes the best way to learn is through experience, not just being told",
                questions: [
                  {
                    question: "How do you think the sage felt when he saw Rama Natha working hard?",
                    type: "empathy_building",
                    guidance: "Consider the sage's motivation and feelings about helping others"
                  }
                ]
              }
            ]
          },
          uiComponent: "MoralExplorationInterface"
        },
        {
          type: "peer_teaching",
          content: {
            prompt: "Now it's your turn to be the teacher! Help your classmates understand this story.",
            teachingActivities: [
              {
                activity: "Story Retelling",
                description: "Tell the story in your own words to a younger student",
                skills: ["communication", "comprehension", "empathy"],
                evaluation: "Can explain story clearly and engagingly"
              },
              {
                activity: "Moral Explanation", 
                description: "Explain the main lesson of the story and why it's important",
                skills: ["analysis", "synthesis", "values"],
                evaluation: "Clearly articulates the moral and its relevance"
              },
              {
                activity: "Character Discussion",
                description: "Lead a discussion about the characters and their motivations",
                skills: ["leadership", "critical thinking", "communication"],
                evaluation: "Facilitates meaningful discussion and insights"
              }
            ]
          },
          uiComponent: "PeerTeachingSimulator"
        }
      ]
    },

    // QUEST 5: CREATIVE EXPRESSION BOSS QUEST
    creativeExpressionBossQuest: {
      id: "creative_storytelling_challenge",
      title: "The Epic Tale Creation Challenge",
      subjects: ["english", "creative_writing", "literature"],
      description: "Face the ultimate challenge: create your own story inspired by 'A Bottle of Dew' and demonstrate complete mastery!",
      type: "boss",
      rewards: {
        xp: 200,
        items: ["master_storyteller_crown", "creative_quill", "imagination_crystal", "chapter_completion_certificate"],
        unlocks: ["next_chapter_portal", "advanced_literature_kingdom", "creative_writing_studio"]
      },
      prerequisites: ["wisdom_and_morals_exploration"],
      activities: [
        {
          type: "creative_story_writing",
          content: {
            prompt: "Create your own story with a similar moral lesson! This is your chance to become a master storyteller!",
            challenges: [
              {
                stage: "Planning Phase",
                description: "Plan your story with characters, setting, and moral lesson",
                requirements: ["main character with a problem", "wise helper character", "clear moral lesson", "engaging setting"],
                guidance: "Think about what lesson you want to teach and how your characters will learn it"
              },
              {
                stage: "Writing Phase", 
                description: "Write your complete story with beginning, middle, and end",
                requirements: ["engaging opening", "character development", "problem and solution", "satisfying conclusion"],
                guidance: "Make your readers care about your characters and their journey"
              },
              {
                stage: "Sharing Phase",
                description: "Present your story to classmates and explain your choices",
                requirements: ["clear presentation", "explanation of moral lesson", "discussion of character choices"],
                guidance: "Help your audience understand why you made specific storytelling decisions"
              }
            ],
            evaluation: {
              creativity: "Original ideas and imaginative elements",
              structure: "Clear beginning, middle, and end",
              characterization: "Well-developed, believable characters", 
              moral_clarity: "Clear and meaningful life lesson",
              presentation: "Engaging delivery and explanation"
            }
          },
          uiComponent: "CreativeStoryBuilder"
        },
        {
          type: "alternative_ending",
          content: {
            prompt: "What if the story had ended differently? Create an alternative ending that teaches a different lesson!",
            scenarios: [
              {
                change: "What if Rama Natha had never met the sage?",
                exploration: "How might his story have been different?",
                lesson_focus: "The importance of good mentors and guidance"
              },
              {
                change: "What if there really was a magic potion?",
                exploration: "How would this change the story's message?",
                lesson_focus: "The value of working for what you achieve"
              },
              {
                change: "What if Madhumati had convinced Rama Natha to work earlier?",
                exploration: "How might their relationship have been different?",
                lesson_focus: "The power of family support and wisdom"
              }
            ],
            requirements: ["logical plot development", "consistent character behavior", "clear new moral lesson", "creative solutions"],
            evaluation: "Demonstrates deep understanding of story elements and themes"
          },
          uiComponent: "AlternativeEndingCreator"
        }
      ]
    }
  },

  // === ASSESSMENT LEVELS ===
  assessmentLevels: {
    level1_remember: {
      type: "knowledge_recall",
      description: "Remember key facts, characters, and story events",
      questions: [
        {
          id: "q1_character_names",
          question: "What is the name of the main character in the story?",
          type: "multiple_choice",
          options: ["Rama Natha", "Mahipati", "Madhumati", "Krishna"],
          correct: "Rama Natha",
          explanation: "Rama Natha is the wealthy young man who inherits land from his father.",
          xp_reward: 15,
          difficulty: "easy"
        },
        {
          id: "q2_sage_task",
          question: "What did the sage ask Rama Natha to collect?",
          type: "multiple_choice", 
          options: ["rainwater", "morning dew", "banana leaves", "flower petals"],
          correct: "morning dew",
          explanation: "The sage told Rama Natha to collect 5 liters of morning dew from banana plant leaves.",
          xp_reward: 15,
          difficulty: "easy"
        },
        {
          id: "q3_time_period",
          question: "How long did it take Rama Natha to collect 5 liters of dew?",
          type: "multiple_choice",
          options: ["one year", "three years", "six years", "ten years"], 
          correct: "six years",
          explanation: "The story mentions that after six years, Rama Natha finally had his five liters of dew.",
          xp_reward: 15,
          difficulty: "easy"
        }
      ],
      rewards: { xp: 50, items: ["memory_gem", "fact_collector_badge"] }
    },

    level2_understand: {
      type: "comprehension_demonstration",
      description: "Show understanding of story themes and character motivations",
      challenges: [
        {
          id: "c1_character_motivation",
          challenge: "Explain why Rama Natha was willing to spend six years collecting dew instead of just working on his farm from the beginning.",
          type: "explanation_task",
          key_points: ["believed in magic solution", "didn't value hard work initially", "thought dew would lead to easy wealth", "learned through experience"],
          sample_answer: "Rama Natha believed the dew would create a magic potion to make him rich easily. He didn't understand that hard work was valuable until he experienced it himself through the sage's clever teaching method.",
          rubric: ["Shows understanding of character beliefs", "Explains the change in perspective", "Recognizes the learning process"],
          xp_reward: 25,
          difficulty: "medium"
        },
        {
          id: "c2_sage_wisdom",
          challenge: "Why do you think the sage used this indirect method to teach Rama Natha about hard work?",
          type: "analysis_task",
          key_points: ["direct advice wouldn't work", "experience teaches better", "Rama Natha needed to discover for himself", "wise teaching method"],
          sample_answer: "The sage knew that simply telling Rama Natha to work hard wouldn't convince him. By making him work for the 'magic potion,' Rama Natha learned the value of hard work through his own experience.",
          rubric: ["Understands teaching methodology", "Shows insight into human nature", "Recognizes wisdom of indirect approach"],
          xp_reward: 30,
          difficulty: "medium"
        }
      ],
      rewards: { xp: 75, items: ["understanding_crystal", "comprehension_crown"] }
    },

    level3_apply: {
      type: "real_world_application",
      description: "Apply story lessons to real-life situations and new contexts",
      scenarios: [
        {
          id: "s1_modern_application",
          scenario: "Your friend wants to become a great musician but only wants to learn the 'easy tricks' instead of practicing scales and basic techniques. How would you advise them using lessons from this story?",
          type: "advice_giving",
          solution_elements: ["hard work is necessary", "no shortcuts to mastery", "practice leads to real skill", "patience with learning process"],
          evaluation_criteria: ["Connects story lesson to new situation", "Provides practical advice", "Shows understanding of work ethic"],
          xp_reward: 40,
          difficulty: "hard"
        },
        {
          id: "s2_teaching_scenario", 
          scenario: "You need to convince a younger student that studying is more important than looking for easy answers online. Create a plan using the sage's teaching approach.",
          type: "strategy_design",
          solution_elements: ["indirect teaching method", "experiential learning", "patience and guidance", "helping them discover for themselves"],
          evaluation_criteria: ["Uses wise teaching principles", "Shows creativity in approach", "Demonstrates empathy and understanding"],
          xp_reward: 45,
          difficulty: "hard"
        }
      ],
      rewards: { xp: 100, items: ["application_armor", "wisdom_staff", "life_lesson_scroll"] }
    },

    level4_analyze: {
      type: "critical_analysis",
      description: "Analyze story elements, themes, and deeper meanings",
      projects: [
        {
          id: "p1_character_development",
          project: "Analyze how Rama Natha changes throughout the story. Create a character development map showing his journey from the beginning to the end.",
          type: "analytical_project",
          components: [
            "beginning character traits",
            "key turning points", 
            "gradual changes",
            "final character state",
            "lessons learned"
          ],
          evaluation_rubric: {
            analysis_depth: "Shows deep understanding of character growth",
            evidence_use: "Uses specific story examples to support points",
            organization: "Presents analysis in clear, logical structure",
            insight: "Demonstrates original thinking about character development"
          },
          xp_reward: 60,
          difficulty: "expert"
        },
        {
          id: "p2_theme_exploration",
          project: "Compare the themes in 'A Bottle of Dew' with other stories you know that teach similar lessons about hard work versus seeking shortcuts.",
          type: "comparative_analysis",
          components: [
            "identification of main themes",
            "comparison with other stories",
            "analysis of different approaches to same lesson",
            "evaluation of effectiveness"
          ],
          evaluation_rubric: {
            theme_identification: "Clearly identifies and explains main themes",
            comparison_quality: "Makes meaningful connections between stories",
            critical_thinking: "Shows analytical thinking about different approaches",
            synthesis: "Combines ideas to form new insights"
          },
          xp_reward: 70,
          difficulty: "expert"
        }
      ],
      rewards: { xp: 125, items: ["analyst_medallion", "critical_thinking_tools", "insight_generator"] }
    }
  },

  // === SOCIAL INTEGRATION ===
  socialIntegration: {
    collaborativeActivities: {
      storyCircle: {
        enabled: true,
        maxParticipants: 6,
        activity: "Students take turns retelling different parts of the story, building on each other's contributions",
        skills: ["listening", "storytelling", "collaboration", "memory"],
        duration: 20
      },
      moralDebate: {
        enabled: true,
        maxParticipants: 8,
        activity: "Debate different perspectives on the sage's teaching method and whether it was the best approach",
        skills: ["critical thinking", "argumentation", "perspective-taking", "communication"],
        duration: 25
      },
      characterRoleplay: {
        enabled: true,
        maxParticipants: 4,
        activity: "Role-play key scenes from the story, exploring character motivations and emotions",
        skills: ["empathy", "performance", "interpretation", "creativity"],
        duration: 30
      }
    },
    peerLearning: {
      storyBuddies: {
        enabled: true,
        pairing: "mixed_reading_levels",
        activity: "Students help each other understand difficult vocabulary and story elements",
        benefits: "Reinforces learning for both tutor and tutee"
      },
      discussionLeaders: {
        enabled: true,
        selection: "rotating_leadership",
        activity: "Students take turns leading discussions about different story themes",
        benefits: "Develops leadership and communication skills"
      }
    },
    safetyFeatures: [
      "teacher_moderated_discussions",
      "positive_communication_guidelines", 
      "inclusive_participation_rules",
      "respectful_disagreement_protocols"
    ]
  },

  // === PARENT ANALYTICS ===
  parentAnalytics: {
    progressInsights: [
      {
        metric: "reading_comprehension_growth",
        description: "How well your child understands and interprets the story",
        visualization: "comprehension_progress_chart"
      },
      {
        metric: "vocabulary_expansion", 
        description: "New words learned and their usage in context",
        visualization: "vocabulary_word_cloud"
      },
      {
        metric: "moral_reasoning_development",
        description: "Ability to identify and apply life lessons from stories",
        visualization: "wisdom_development_tree"
      },
      {
        metric: "creative_expression_skills",
        description: "Growth in storytelling and creative writing abilities",
        visualization: "creativity_portfolio_gallery"
      }
    ],
    engagementData: [
      {
        insight: "preferred_story_elements",
        description: "Which parts of the story most engage your child",
        actionable_advice: "Encourage reading similar folk tales and moral stories"
      },
      {
        insight: "collaborative_learning_style",
        description: "How your child participates in group story discussions",
        actionable_advice: "Practice storytelling and discussion skills at home"
      }
    ],
    homeActivities: [
      {
        activity: "family_story_time",
        description: "Read and discuss folk tales from different cultures together",
        materials: ["story collection", "discussion questions"],
        duration: "20-30 minutes"
      },
      {
        activity: "moral_lesson_hunting",
        description: "Look for life lessons in everyday situations and stories",
        materials: ["observation journal", "reflection questions"],
        duration: "ongoing daily practice"
      }
    ]
  },

  // === TEACHER TOOLS ===
  teacherTools: {
    classroomActivities: {
      wholeClassDiscussion: {
        enabled: true,
        topics: ["story themes", "character analysis", "moral applications", "cultural connections"],
        facilitation_guides: "structured_discussion_prompts_with_differentiation_options"
      },
      literatureCircles: {
        enabled: true,
        grouping: "mixed_ability_groups_of_4_to_6",
        roles: ["discussion_leader", "vocabulary_explorer", "theme_tracker", "connection_maker"],
        rotation: "weekly_role_changes"
      },
      creativeDrama: {
        enabled: true,
        activities: ["scene_reenactment", "character_interviews", "alternative_ending_performances"],
        assessment: "participation_rubric_and_peer_feedback"
      }
    },
    differentiationSupport: {
      strugglingReaders: {
        supports: ["audio_story_version", "vocabulary_pre_teaching", "graphic_organizers", "partner_reading"],
        modifications: "simplified_questions_with_visual_supports"
      },
      advancedLearners: {
        extensions: ["comparative_literature_analysis", "creative_story_variations", "research_on_folk_tale_origins"],
        enrichment: "independent_reading_recommendations"
      },
      englishLanguageLearners: {
        supports: ["visual_vocabulary_cards", "cultural_context_explanations", "native_language_connections"],
        scaffolds: "sentence_frames_for_discussions"
      }
    },
    assessmentTools: {
      formativeAssessments: ["exit_tickets", "story_mapping", "character_feeling_thermometers", "quick_polls"],
      summativeAssessments: ["story_retelling_rubric", "character_analysis_project", "moral_application_essay"],
      portfolioComponents: ["vocabulary_journal", "story_response_collection", "creative_writing_samples"]
    }
  },

  // === GAME INTEGRATION ===
  gameIntegration: {
    mainStorylineGame: {
      file: "bottle_of_dew_adventure.js",
      description: "Interactive story adventure where students make choices as characters",
      gameType: "narrative_adventure",
      features: ["character_dialogue_trees", "decision_making_points", "consequence_exploration"],
      assets: ["character_avatars", "rural_indian_village_backgrounds", "plantation_environments"]
    },
    vocabularyGames: [
      {
        file: "magical_word_quest.js",
        description: "Fantasy adventure game for learning story vocabulary",
        gameType: "word_adventure",
        mechanics: ["word_collection", "definition_matching", "context_usage"]
      },
      {
        file: "sage_wisdom_challenges.js", 
        description: "Puzzle game where students unlock wisdom through vocabulary mastery",
        gameType: "puzzle_adventure",
        mechanics: ["riddle_solving", "word_puzzles", "meaning_mysteries"]
      }
    ],
    comprehensionGames: [
      {
        file: "story_detective.js",
        description: "Mystery game where students solve puzzles by understanding story details",
        gameType: "detective_investigation",
        mechanics: ["clue_gathering", "inference_making", "evidence_analysis"]
      },
      {
        file: "character_mind_reader.js",
        description: "Empathy-building game exploring character thoughts and motivations",
        gameType: "psychological_exploration",
        mechanics: ["emotion_identification", "motivation_analysis", "perspective_taking"]
      }
    ],
    creativeGames: [
      {
        file: "story_builder_studio.js",
        description: "Creative platform for building and sharing original stories",
        gameType: "creation_sandbox",
        mechanics: ["story_construction", "character_design", "plot_development"]
      }
    ]
  },

  // === ACCESSIBILITY ===
  accessibility: {
    readingSupports: [
      {
        feature: "text_to_speech",
        description: "Full story narration with expressive voice acting",
        implementation: "high_quality_audio_with_highlighting"
      },
      {
        feature: "adjustable_text_size",
        description: "Scalable fonts from 12px to 24px for comfortable reading",
        implementation: "dynamic_font_scaling_with_layout_preservation"
      },
      {
        feature: "dyslexia_friendly_options",
        description: "Special fonts and formatting for students with reading difficulties",
        implementation: "opendyslexic_font_option_with_increased_spacing"
      }
    ],
    visualSupports: [
      {
        feature: "story_illustrations",
        description: "Rich visual representations of key story scenes and characters",
        implementation: "culturally_authentic_artwork_with_descriptive_alt_text"
      },
      {
        feature: "concept_graphics",
        description: "Visual organizers and diagrams for story structure and themes",
        implementation: "interactive_graphic_organizers_with_drag_and_drop"
      }
    ],
    languageSupports: [
      {
        feature: "vocabulary_assistance",
        description: "Instant definitions and pronunciations for difficult words",
        implementation: "click_for_definition_with_audio_pronunciation"
      },
      {
        feature: "multilingual_support",
        description: "Key vocabulary and concepts available in multiple Indian languages",
        implementation: "toggle_between_english_and_regional_languages"
      }
    ]
  },

  // === OFFLINE SUPPORT ===
  offlineSupport: {
    downloadableContent: [
      {
        type: "complete_story_text",
        description: "Full story with illustrations for offline reading",
        size: "8MB",
        priority: "high"
      },
      {
        type: "vocabulary_flashcards",
        description: "Interactive vocabulary practice cards",
        size: "3MB", 
        priority: "high"
      },
      {
        type: "comprehension_activities",
        description: "Story questions and activities with answer keys",
        size: "5MB",
        priority: "medium"
      },
      {
        type: "audio_narration",
        description: "Professional story narration for listening practice",
        size: "25MB",
        priority: "medium"
      }
    ],
    offlineActivities: [
      {
        activity: "story_journaling",
        description: "Written reflection and response activities",
        materials: "downloadable_journal_templates"
      },
      {
        activity: "character_drawing",
        description: "Artistic interpretation of story characters and scenes",
        materials: "drawing_guides_and_templates"
      },
      {
        activity: "family_discussion",
        description: "Guided family conversations about story themes",
        materials: "discussion_question_cards"
      }
    ],
    syncPriorities: [
      {
        priority: "critical",
        content: ["story_completion_progress", "vocabulary_mastery_data", "comprehension_scores"],
        syncTiming: "immediate_when_online"
      },
      {
        priority: "important",
        content: ["creative_writing_submissions", "discussion_contributions", "peer_interaction_logs"],
        syncTiming: "within_2_hours_when_online"
      }
    ]
  }
};