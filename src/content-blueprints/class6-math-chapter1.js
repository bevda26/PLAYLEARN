// Grade 6 Mathematics - Patterns in Mathematics (Blueprint Format)
export const chapterModule = {
  metadata: {
    id: "class6_math_patterns_in_mathematics",
    title: "Patterns in Mathematics",
    class: 6,
    stream: "general",
    subjects: ["mathematics"],
    description: "Discover mathematics as the search for patterns in numbers and shapes, learning to recognize, visualize, and explain mathematical relationships.",
    prerequisites: ["basic_counting", "simple_shapes", "basic_arithmetic"]
  },

  questArc: {
    // QUEST 1: Pattern Discovery Quest
    patternDiscoveryQuest: {
      id: "pattern_discovery_adventure",
      title: "The Great Pattern Discovery Adventure",
      subjects: ["mathematics"],
      description: "Embark on an exciting journey to discover what mathematics really is and explore the fascinating world of number patterns.",
      type: "investigation",
      rewards: {
        xp: 100,
        items: ["pattern_detective_badge", "sequence_decoder"],
        unlocks: ["visualization_tools"]
      },
      activities: [
        {
          type: "informational",
          content: {
            prompt: "Mathematics is, in large part, the search for patterns and explanations for why those patterns exist. These patterns are everywhere - in nature, in our homes, and even in the motion of stars!",
            uiComponent: "Card"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "Which of these is an example of how mathematics helps in everyday life?",
            options: [
              "Building bridges and houses",
              "Making mobile phones and computers", 
              "Understanding weather patterns",
              "All of the above"
            ],
            correctAnswer: "All of the above",
            feedback: {
              correct: "Excellent! Mathematics helps us in countless ways every day.",
              incorrect: "Think about all the ways math is used around us - try again!"
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "What is the next number in this counting sequence: 1, 2, 3, 4, ___?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "5",
            feedback: {
              correct: "Perfect! Counting numbers increase by 1 each time.",
              incorrect: "Look at the pattern - each number increases by 1."
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "multiple_choice", 
          content: {
            prompt: "Which sequence represents odd numbers?",
            options: [
              "2, 4, 6, 8, 10...",
              "1, 3, 5, 7, 9...", 
              "1, 2, 3, 4, 5...",
              "1, 4, 9, 16, 25..."
            ],
            correctAnswer: "1, 3, 5, 7, 9...",
            feedback: {
              correct: "Great! Odd numbers skip every other number starting from 1.",
              incorrect: "Odd numbers are 1, 3, 5, 7, 9... - they skip the even numbers."
            },
            uiComponent: "RadioGroup"
          }
        }
      ]
    },

    // QUEST 2: Number Sequence Quest  
    numberSequenceQuest: {
      id: "number_sequence_mastery",
      title: "Master of Number Sequences",
      subjects: ["mathematics"],
      description: "Explore different types of number sequences and learn to identify their patterns and rules.",
      type: "experiment",
      prerequisites: ["pattern_discovery_adventure"],
      rewards: {
        xp: 150,
        items: ["sequence_master_badge", "pattern_analyzer"],
        unlocks: ["visual_pattern_tools"]
      },
      activities: [
        {
          type: "text_input",
          content: {
            prompt: "Complete the sequence of even numbers: 2, 4, 6, 8, ___",
            correctAnswer: "10",
            feedback: {
              correct: "Excellent! Even numbers increase by 2 each time.",
              incorrect: "Even numbers follow the pattern +2. Try again!"
            },
            uiComponent: "Input"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "What type of sequence is 1, 4, 9, 16, 25...?",
            options: ["Counting numbers", "Even numbers", "Square numbers", "Odd numbers"],
            correctAnswer: "Square numbers",
            feedback: {
              correct: "Perfect! These are 1², 2², 3², 4², 5²...",
              incorrect: "Think about what happens when you multiply numbers by themselves."
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "What comes next in the triangular sequence: 1, 3, 6, 10, ___?",
            correctAnswer: "15",
            feedback: {
              correct: "Amazing! The differences are 2, 3, 4, so next is +5 = 15.",
              incorrect: "Look at the differences between consecutive numbers: +2, +3, +4, so next should be +5."
            },
            uiComponent: "Input"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "In the Virahānka sequence 1, 1, 2, 3, 5, 8, 13..., what's the pattern?",
            options: [
              "Add 1 each time",
              "Add 2 each time", 
              "Each number is the sum of the two before it",
              "Multiply by 2 each time"
            ],
            correctAnswer: "Each number is the sum of the two before it",
            feedback: {
              correct: "Brilliant! 1+1=2, 1+2=3, 2+3=5, 3+5=8, etc.",
              incorrect: "Look carefully: 1+1=2, 1+2=3, 2+3=5... see the pattern?"
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "What's the next number in the powers of 2 sequence: 1, 2, 4, 8, ___?",
            correctAnswer: "16",
            feedback: {
              correct: "Perfect! Each number doubles: 8 × 2 = 16.",
              incorrect: "Each number is double the previous one. What's 8 × 2?"
            },
            uiComponent: "Input"
          }
        }
      ]
    },

    // QUEST 3: Visual Pattern Quest
    visualPatternQuest: {
      id: "visual_pattern_explorer",
      title: "Visual Pattern Explorer",
      subjects: ["mathematics"],
      description: "Learn to visualize number sequences using pictures and discover why certain patterns work the way they do.",
      type: "experiment", 
      prerequisites: ["number_sequence_mastery"],
      rewards: {
        xp: 175,
        items: ["visual_master_badge", "pattern_visualizer"],
        unlocks: ["advanced_patterns"]
      },
      activities: [
        {
          type: "informational",
          content: {
            prompt: "Many number sequences can be visualized using pictures! For example, square numbers can be shown as actual squares made of dots, and triangular numbers form triangular patterns.",
            uiComponent: "Card"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "Why are 1, 3, 6, 10, 15... called triangular numbers?",
            options: [
              "They have three digits",
              "They can be arranged in triangular patterns",
              "They are multiples of 3", 
              "They are odd numbers"
            ],
            correctAnswer: "They can be arranged in triangular patterns",
            feedback: {
              correct: "Exactly! You can arrange dots in triangular shapes with these numbers.",
              incorrect: "Think about arranging dots... these numbers form perfect triangular patterns!"
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "Why are 1, 4, 9, 16, 25... called square numbers?",
            options: [
              "They can be arranged in square patterns",
              "They are even numbers",
              "They end in 5",
              "They are multiples of 4"
            ],
            correctAnswer: "They can be arranged in square patterns", 
            feedback: {
              correct: "Perfect! These numbers form perfect square grids when arranged as dots.",
              incorrect: "Think about arranging these numbers of dots in square grids!"
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "The hexagonal numbers shown are: 1, 7, 19, 37... What comes next?",
            correctAnswer: "61",
            feedback: {
              correct: "Excellent! The pattern increases by 6, 12, 18, so next is +24 = 61.",
              incorrect: "Look at the differences: +6, +12, +18... the next difference should be +24."
            },
            uiComponent: "Input"
          }
        }
      ]
    },

    // QUEST 4: Pattern Relationships Quest
    patternRelationshipsQuest: {
      id: "pattern_relationships_detective", 
      title: "Pattern Relationships Detective",
      subjects: ["mathematics"],
      description: "Discover the amazing relationships between different number sequences and learn why these connections exist.",
      type: "challenge",
      prerequisites: ["visual_pattern_explorer"],
      rewards: {
        xp: 200,
        items: ["relationship_detective_badge", "connection_finder"],
        unlocks: ["shape_patterns"]
      },
      activities: [
        {
          type: "informational",
          content: {
            prompt: "Amazing discovery! When you add up odd numbers starting from 1, you get square numbers: 1=1, 1+3=4, 1+3+5=9, 1+3+5+7=16! This isn't coincidence - there's a beautiful reason why this works.",
            uiComponent: "Alert"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "If 1+3+5+7 = 16, what would be the sum of the first 5 odd numbers: 1+3+5+7+9 = ?",
            correctAnswer: "25",
            feedback: {
              correct: "Perfect! 25 is 5², showing the pattern continues!",
              incorrect: "Remember: adding the first n odd numbers always gives n². So 5 odd numbers = 5² = 25."
            },
            uiComponent: "Input"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "What would be the sum of the first 10 odd numbers?",
            options: ["50", "100", "90", "110"],
            correctAnswer: "100", 
            feedback: {
              correct: "Brilliant! 10² = 100. The first n odd numbers always sum to n².",
              incorrect: "Use the pattern: first n odd numbers sum to n². So 10 odd numbers = 10² = 100."
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "Another pattern: 1=1, 1+2+1=4, 1+2+3+2+1=9. What is 1+2+3+4+3+2+1?",
            correctAnswer: "16",
            feedback: {
              correct: "Excellent! This 'up and down' pattern also gives square numbers: 4² = 16.",
              incorrect: "This follows the same square pattern: counting up to 4 then back down gives 4² = 16."
            },
            uiComponent: "Input"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "When you add consecutive triangular numbers (1+3=4, 3+6=9, 6+10=16...), what sequence do you get?",
            options: ["Even numbers", "Square numbers", "Counting numbers", "Odd numbers"],
            correctAnswer: "Square numbers",
            feedback: {
              correct: "Amazing discovery! Adding consecutive triangular numbers gives square numbers.",
              incorrect: "Look at the sums: 4, 9, 16... these are all perfect squares!"
            },
            uiComponent: "RadioGroup"
          }
        }
      ]
    },

    // QUEST 5: Shape Pattern Quest
    shapePatternQuest: {
      id: "shape_pattern_master",
      title: "Master of Shape Patterns", 
      subjects: ["mathematics"],
      description: "Explore patterns in geometric shapes and discover how they connect to number sequences.",
      type: "mastery",
      prerequisites: ["pattern_relationships_detective"],
      rewards: {
        xp: 250,
        items: ["shape_master_badge", "geometry_expert_certificate"],
        unlocks: ["advanced_mathematics"]
      },
      activities: [
        {
          type: "informational",
          content: {
            prompt: "Shapes also follow amazing patterns! Regular polygons, stacked shapes, and complex fractals all connect to number sequences in surprising ways.",
            uiComponent: "Card"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "How many sides does a hexagon have?",
            options: ["5", "6", "7", "8"],
            correctAnswer: "6",
            feedback: {
              correct: "Perfect! 'Hex' means six, so a hexagon has 6 sides.",
              incorrect: "Remember: hex = 6, like hexagonal numbers we saw earlier!"
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "In regular polygons (triangle, square, pentagon, hexagon...), what number sequence do the sides follow?",
            options: [
              "1, 2, 3, 4, 5...",
              "3, 4, 5, 6, 7...", 
              "2, 4, 6, 8, 10...",
              "1, 4, 9, 16, 25..."
            ],
            correctAnswer: "3, 4, 5, 6, 7...",
            feedback: {
              correct: "Excellent! Regular polygons start with 3 sides (triangle) and increase by 1.",
              incorrect: "Polygons start with triangle (3 sides), then square (4), pentagon (5), etc."
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "If you stack squares in a pattern (1 square, then 4 squares, then 9 squares...), how many small squares would be in the 5th pattern?",
            correctAnswer: "25",
            feedback: {
              correct: "Perfect! The 5th pattern would be a 5×5 square = 25 small squares.",
              incorrect: "Think of stacked squares as 1×1, 2×2, 3×3, 4×4, 5×5... So 5×5 = 25."
            },
            uiComponent: "Input"
          }
        },
        {
          type: "multiple_choice",
          content: {
            prompt: "What makes the Koch Snowflake sequence special?",
            options: [
              "It gets smaller each time",
              "It uses triangles only",
              "Each line segment becomes a 'speed bump' pattern",
              "It has exactly 6 sides"
            ],
            correctAnswer: "Each line segment becomes a 'speed bump' pattern",
            feedback: {
              correct: "Exactly! Each iteration replaces every line with a triangle 'bump' creating infinite complexity.",
              incorrect: "The Koch Snowflake grows by replacing each line segment with a triangular 'speed bump'."
            },
            uiComponent: "RadioGroup"
          }
        },
        {
          type: "text_input",
          content: {
            prompt: "Complete this summary: Mathematics is the search for _______ and explanations for why they exist.",
            correctAnswer: "patterns",
            feedback: {
              correct: "Perfect! You've discovered that mathematics is fundamentally about finding and explaining patterns!",
              incorrect: "Think about what we've been discovering throughout this chapter... what is mathematics really about?"
            },
            uiComponent: "Input"
          }
        }
      ]
    }
  }
};
