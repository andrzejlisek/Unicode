# Derivative character finding

The standard ASCII characters has number from **20** to **7E**, including letters, digits and standard special characters\. The derivative character has the number outside the ASCII character number, but is similar to ASCII character\. For instance, the derivative characters for **Z** are several characters including **Ż** and **Ź**\.

The algorithm uses official character name to determine, if the current character is derivative of specified character\. You can select ASCII character and find all derivatives, but you can not directly select non\-ASCII character and find the ASCII base character if exists\. On the other hand, you can create the list of all derivatives for every ASCII character and you can find the ASCII character for every non\-ASCII character via searching the non\-ASCII character on every of 95 lists\.

Every ASCII character has the derivative definition by sets of the criteria called as variants:


* Included phrases in name\.
* Excluded phrases in name\.

For derivative list of single character, there can be several criteria variants\. The character will be added to the list if meets at least one variant criteria\. Additionally, for some characters, thera are explicitly defined included numbers and excluded numbers:


* The included numbers are the characters, which will be included in the derivative list regardless the character name and criteria meet\.
* The excluded number are the characters, which will be excluded from the derivative list regardless the character name and criteria meet\.

## Search variant example

For instance, assume, that search for certain character derivatives has the following criteria:


* Variant 1:
  * Include: **APOSTROPHE**, **DOUBLE**
  * Exclude: **LETTER**, **PRECEDED**
* Variant 2:
  * Include: **DOUBLE**, **QUOTATION**
  * Exclude: **ANGLE**, **LETTER**

For more readibility, assume, that:


* the **SOMEPHRASE** means that the character name must contain the **SOMEPHRASE** phrase\.
* the **~SOMEPHRASE** means that the character name must not contain the **SOMEPHRASE** phrase\.

The example above can be written as logic formula:

\(**APOSTROPHE** & **DOUBLE** & **~LETTER** & **~PRECEDED**\) &#124; \(**DOUBLE** & **QUOTATION** & **~ANGLE** & **~LETTER**\)

## Algorithm approach

The algoritm generating or hardcoding search variants relys on the following assumptions:


* Never actually derivative character should be ommited\.
* Some characters, which actually are not derivatives can be included as derivatives\.
* Every non\-ASCII character can be at most one base characters for avoid ambiguously search for ASCII character for specified non\-ASCII character\.
* For search, the non\-ASCII character names are surrounded with single leading and trailing space\.

# Derivative for letters

Every letter has the one\-character name\. Some derivatives from letters can have other letter names\. Most cyrillic and greek letters can be also treated as ASCII derivatives in transliteration\. The name for every letter is specified in the table below\. For instance, if you want to find ALL derivatives for **H**, the program will search for letter, which has the name **H** or **HENG** or **HA** or **CHI**\. On the other words, the **H** letter in derivative context, has four different names\.

| Letter | Latin | Cyrillic | Greek |
| --- | --- | --- | --- |
| A | AE | YA, IA | ALPHA |
| B |   | BE | BETA |
| C |   | TSE |   |
| D |   | DE, DJE | DELTA |
| E |   | IE, SCHWA | EPSILON, ETA |
| F |   | EF | PHI |
| G |   | GHE, GJE | GAMMA |
| H | HENG | HA | CHI |
| I |   | II, YI | IOTA |
| J |   | JE |   |
| K | KRA | KA, KJE | KAPPA |
| L |   | EL | LAMBDA |
| M |   | EM | MU |
| N | ENG | EN | NU |
| O | OE, OU | IO | OMICRON, OMEGA |
| P |   | PE | PI, PSI |
| Q |   |   |   |
| R |   | ER | RHO |
| S | ESH | ES | SIGMA |
| T |   | TE | THETA, TAU |
| U |   | YU, IU |   |
| V |   | VE |   |
| W |   |   |   |
| X |   |   | XI |
| Y |   | YERU, YERI | UPSILON |
| Z | EZH, YOGH | ZHE, ZE, DZE | ZETA |

The derivative letter character name can have many possible combinations and for specified character, the name criteria are generated automatically using the following information:


* Common first phrase parts: "TURNED", "INVERTED", "REVERSED", "DOTLESS", "OPEN", "CLOSED", "SHORT", "LONG", "SCRIPT", "BASHKIR", "STRAIGHT", "BARRED", "AFRICAN", "ABKHASIAN"
* For small case letter:
  * Additional first phrase parts: "LETTER", "CAPITAL", "SMALL"
  * Second phrases: " SMALL LETTER ", " SMALL CAPITAL ", " MODIFIER LETTER SMALL "
* For capital case letter:
  * Additional first phrase parts: " CAPITAL LETTER "
  * Second phrases: "LETTER"

The base search variants are built as the following algorithm:


* The number of variants equals to the number of common phrases parts multiplied by number of second phrases\.
* For every additional for first phrase:
  * Add the one additional phrase part to the common phrase list\.
  * For every common first phrase part \(extended by one additional phase part\) and every letter name \(see table above\):
    * Create the variant, which has including two phrases, without any excluding phrases:
      * First including phrase is concatenation of these parts:
        * Space character\.
        * First phrase part from the common list extended by one additional phrase\.
        * Space character
        * Letter name from the table
        * Space
      * Second including phrase: The second phrase at the same position as the additional first phrase part\.
  * Remove the additional phrase from the common phrase list\.

## Phase generation example

For more clarity and readibility, the example assumes, that the common first phrase parts list consists of 3 elements only instead of 14 elements: "TURNED", "INVERTED", "REVERSED"

For instance, assume, that you want for search variants for ASCII character **b** \(small capital, has names **B**, **BE**, **BETA**\)\. There will be created the following variants, which each has including two phrases:


* The first additional and sencond phrase:
  * " TURNED B ", " SMALL LETTER "
  * " TURNED BE ", " SMALL LETTER "
  * " TURNED BETA ", " SMALL LETTER "
  * " INVERTED B ", " SMALL LETTER "
  * " INVERTED BE ", " SMALL LETTER "
  * " INVERTED BETA ", " SMALL LETTER "
  * " REVERSED B ", " SMALL LETTER "
  * " REVERSED BE ", " SMALL LETTER "
  * " REVERSED BETA ", " SMALL LETTER "
  * " LETTER B ", " SMALL LETTER "
  * " LETTER BE ", " SMALL LETTER "
  * " LETTER BETA ", " SMALL LETTER "
* The second additional and sencond phrase:
  * " TURNED B ", " SMALL CAPITAL "
  * " TURNED BE ", " SMALL CAPITAL "
  * " TURNED BETA ", " SMALL CAPITAL "
  * " INVERTED B ", " SMALL CAPITAL "
  * " INVERTED BE ", " SMALL CAPITAL "
  * " INVERTED BETA ", " SMALL CAPITAL "
  * " REVERSED B ", " SMALL CAPITAL "
  * " REVERSED BE ", " SMALL CAPITAL "
  * " REVERSED BETA ", " SMALL CAPITAL "
  * " CAPITAL B ", " SMALL CAPITAL "
  * " CAPITAL BE ", " SMALL CAPITAL "
  * " CAPITAL BETA ", " SMALL CAPITAL "
* The third additional and sencond phrase:
  * " TURNED B ", " MODIFIER LETTER SMALL "
  * " TURNED BE ", " MODIFIER LETTER SMALL "
  * " TURNED BETA ", " MODIFIER LETTER SMALL "
  * " INVERTED B ", " MODIFIER LETTER SMALL "
  * " INVERTED BE ", " MODIFIER LETTER SMALL "
  * " INVERTED BETA ", " MODIFIER LETTER SMALL "
  * " REVERSED B ", " MODIFIER LETTER SMALL "
  * " REVERSED BE ", " MODIFIER LETTER SMALL "
  * " REVERSED BETA ", " MODIFIER LETTER SMALL "
  * " SMALL B ", " MODIFIER LETTER SMALL "
  * " SMALL BE ", " MODIFIER LETTER SMALL "
  * " SMALL BETA ", " MODIFIER LETTER SMALL "

For the B \(capital letter\), there will be created the following phrases:


* The single additional and sencond phrase:
  * " TURNED B ", " CAPITAL LETTER "
  * " TURNED BE ", " CAPITAL LETTER "
  * " TURNED BETA ", " CAPITAL LETTER "
  * " INVERTED B ", " CAPITAL LETTER "
  * " INVERTED BE ", " CAPITAL LETTER "
  * " INVERTED BETA ", " CAPITAL LETTER "
  * " REVERSED B ", " CAPITAL LETTER "
  * " REVERSED BE ", " CAPITAL LETTER "
  * " REVERSED BETA ", " CAPITAL LETTER "
  * " LETTER B ", " CAPITAL LETTER "
  * " LETTER BE ", " CAPITAL LETTER "
  * " LETTER BETA ", " CAPITAL LETTER "

To the list ov derivatives, there will be added every char, which name contains both phrases mentioned in at leas one variant\.

# Derivative for other ASCII characters and letter exceptions

The table below describes the search variants for digits and special characters\. It also desctibes additional included and excluded character numbers for some letter to avoid ambigously\. For letter **e** \(small case\), there asre alco included additional variant apart from the automatic generated variants as described above\.

| Character | Search | Include | Exclude |
| --- | --- | --- | --- |
| \(space\) | Characters | 7F |   |
| \(space\) | Variant 1 | " SPACE " | " LETTER " |
| \! | Characters | 01C3 |   |
| \! | Variant 1 | " EXCLAMATION " | " GREATER ", " LESS ", " LETTER ", " QUESTION " |
| " | Characters | 84, 93, 94, 02DD |   |
| " | Variant 1 | " APOSTROPHE ", " DOUBLE " | " LETTER ", " PRECEDED " |
| " | Variant 2 | " DOUBLE ", " QUOTATION " | " ANGLE ", " LETTER " |
| " | Variant 3 | " DOUBLE ", " MODIFIER LETTER " |   |
| \# | Variant 1 | " NUMBER SIGN " |   |
| $ | Variant 1 | " DOLLAR " |   |
| % | Variant 1 | " PERCENT " |   |
| & | Variant 1 | " AMPERSAND " |   |
| ' | Characters | 82, 91, 92, 02B9, 02BC |   |
| ' | Variant 1 | " ACUTE ACCENT " | " DOUBLE ", " LETTER " |
| ' | Variant 2 | " ACUTE ACCENT ", " MODIFIER LETTER " | " DOUBLE " |
| ' | Variant 3 | " APOSTROPHE " | " DOUBLE ", " LETTER ", " PRECEDED " |
| ' | Variant 4 | " QUOTATION ", " SINGLE " | " ANGLE ", " LETTER " |
| \( | Variant 1 | " LEFT ", " PARENTHESIS " | " CLOSING ", " RIGHT " |
| \( | Variant 2 | " OPENING ", " PARENTHESIS " | " CLOSING ", " RIGHT " |
| \( | Variant 3 | " BRACKET ", " LEFT " | " ANGLE BRACKET ", " CLOSING ", " CURLY BRACKET ", " RIGHT ", " SQUARE BRACKET " |
| \( | Variant 4 | " BRACKET ", " OPENING " | " ANGLE BRACKET ", " CLOSING ", " CURLY BRACKET ", " RIGHT ", " SQUARE BRACKET " |
| \) | Variant 1 | " PARENTHESIS ", " RIGHT " | " LEFT ", " OPENING " |
| \) | Variant 2 | " CLOSING ", " PARENTHESIS " | " LEFT ", " OPENING " |
| \) | Variant 3 | " BRACKET ", " RIGHT " | " ANGLE BRACKET ", " CURLY BRACKET ", " LEFT ", " OPENING ", " SQUARE BRACKET " |
| \) | Variant 4 | " BRACKET ", " CLOSING " | " ANGLE BRACKET ", " CURLY BRACKET ", " LEFT ", " OPENING ", " SQUARE BRACKET " |
| \* | Variant 1 | " ASTERISK " |   |
| \* | Variant 2 | " STAR " |   |
| \+ | Characters | 02D6 |   |
| \+ | Variant 1 | " PLUS " | " MINUS " |
| , | Characters | 02BB, 02BD |   |
| , | Variant 1 | " COMMA " | " DIGIT ", " LETTER ", " MINUS ", " PLUS ", " QUOTATION " |
| \- | Characters | 02D7 |   |
| \- | Variant 1 | " MINUS " | " PLUS " |
| \- | Variant 2 | " HYPHEN " |   |
| \- | Variant 3 | " DASH " | " VERTICAL " |
| \. | Variant 1 | " FULL STOP " | " DIGIT ", " LETTER ", " NUMBER ", " QUOTATION " |
| \. | Variant 2 | " PERIOD " | " DIGIT ", " LETTER ", " NUMBER ", " QUOTATION " |
| / | Variant 1 | " SLASH " | " BACKSLASH ", " LETTER " |
| / | Variant 2 | " SOLIDUS " | " LETTER ", " REVERSE SOLIDUS " |
| 0 | Variant 1 | " DIGIT ZERO " |   |
| 1 | Variant 1 | " DIGIT ONE " |   |
| 2 | Variant 1 | " DIGIT TWO " |   |
| 3 | Variant 1 | " DIGIT THREE " |   |
| 4 | Variant 1 | " DIGIT FOUR " |   |
| 5 | Variant 1 | " DIGIT FIVE " |   |
| 6 | Variant 1 | " DIGIT SIX " |   |
| 7 | Variant 1 | " DIGIT SEVEN " |   |
| 8 | Variant 1 | " DIGIT EIGHT " |   |
| 9 | Variant 1 | " DIGIT NINE " |   |
| : | Variant 1 | " COLON " |   |
| ; | Variant 1 | " SEMICOLON " |   |
| < | Characters | 8B, 02C2, 02F1, 2039 | 2A9F |
| < | Variant 1 | " ANGLE BRACKET ", " LEFT " | " CLOSING ", " RIGHT " |
| < | Variant 2 | " ANGLE BRACKET ", " OPENING " | " CLOSING ", " RIGHT " |
| < | Variant 3 | " LESS\-THAN " | " BRACKET ", " GREATER\-THAN " |
| = | Variant 1 | " EQUALS SIGN " | " MINUS ", " PLUS " |
| > | Characters | 9B, 02C3, 02F2, 203A | 2AA0 |
| > | Variant 1 | " ANGLE BRACKET ", " RIGHT " | " LEFT ", " OPENING " |
| > | Variant 2 | " ANGLE BRACKET ", " CLOSING " | " LEFT ", " OPENING " |
| > | Variant 3 | " GREATER\-THAN " | " BRACKET ", " LESS\-THAN " |
| ? | Characters | 2426 | 2A7B, 2A7C |
| ? | Variant 1 | " QUESTION " | " EXCLAMATION ", " LETTER " |
| @ | Variant 1 | " COMMERCIAL AT " |   |
| A | Characters | 04D4 |   |
| C | Characters | A9 |   |
| D | Characters | 01C4, 01C5, 01F1, 01F2 | 01C6, 01F3 |
| H | Characters |   | 04A8 |
| J | Characters |   | 01C7, 01C8, 01C9, 01CA, 01CB, 01CC |
| L | Characters | A3, 01C7, 01C8 | 01C9 |
| N | Characters | 01CA, 01CB | 01CC |
| Q | Characters | 024A |   |
| R | Characters | AE |   |
| S | Characters | 8A |   |
| Y | Characters | 9F, A5 |   |
| Z | Characters | 8E | 01C4, 01C5, 01C6, 01F1, 01F2, 01F3 |
| \[ | Variant 1 | " LEFT ", " SQUARE BRACKET " | " CLOSING ", " RIGHT " |
| \[ | Variant 2 | " OPENING ", " SQUARE BRACKET " | " CLOSING ", " RIGHT " |
| \\ | Characters |   | 01F10F |
| \\ | Variant 1 | " BACKSLASH " | " LETTER " |
| \\ | Variant 2 | " REVERSE SOLIDUS " | " LETTER " |
| \] | Variant 1 | " RIGHT ", " SQUARE BRACKET " | " LEFT ", " OPENING " |
| \] | Variant 2 | " CLOSING ", " SQUARE BRACKET " | " LEFT ", " OPENING " |
| ^ | Variant 1 | " CIRCUMFLEX ACCENT " | " MINUS ", " PLUS " |
| \_ | Variant 1 | " UNDERSCORE " |   |
| \_ | Variant 2 | " LOW LINE " |   |
| \` | Variant 1 | " GRAVE ACCENT " | " DOUBLE ", " LETTER " |
| \` | Variant 2 | " GRAVE ACCENT ", " MODIFIER LETTER " | " DOUBLE " |
| a | Characters | AA, 04D5 |   |
| c | Characters | A2 |   |
| d | Characters | 01C6, 01F3, 0238, 2202 | 01C4, 01C5, 01F1, 01F2 |
| e | Variant 1 | " ET ", " LIGATURE " |   |
| f | Characters | 83, 02A9, FB00, FB01, FB02, FB03, FB04 |   |
| g | Characters | 0264 |   |
| h | Characters | 210E, 210F | 04A9 |
| j | Characters |   | 01C7, 01C8, 01C9, 01CA, 01CB, 01CC |
| l | Characters | 01C9, 02AA, 02AB | 01C7, 01C8 |
| m | Characters | B5 | FE58 |
| n | Characters | 01CC | 01CA, 01CB |
| o | Characters | BA |   |
| q | Characters | 0239 |   |
| s | Characters | 9A, 03C2, FB05, FB06 |   |
| z | Characters | 9E | 01C4, 01C5, 01C6, 01F1, 01F2, 01F3 |
| \{ | Variant 1 | " CURLY BRACKET ", " LEFT " | " CLOSING ", " RIGHT " |
| \{ | Variant 2 | " CURLY BRACKET ", " OPENING " | " CLOSING ", " RIGHT " |
| &#124; | Characters | 01C0, 01C1, 01C2, 02C8, 02CC |   |
| &#124; | Variant 1 | " VERTICAL LINE " | " LETTER " |
| &#124; | Variant 2 | " VERTICAL BAR " | " LETTER " |
| &#124; | Variant 3 | " BROKEN BAR " | " LETTER " |
| &#124; | Variant 4 | " DASH ", " VERTICAL " |   |
| \} | Variant 1 | " CURLY BRACKET ", " RIGHT " | " LEFT ", " OPENING " |
| \} | Variant 2 | " CLOSING ", " CURLY BRACKET " | " LEFT ", " OPENING " |
| ~ | Characters | 98, 02F7 |   |
| ~ | Variant 1 | " TILDE " | " EQUALS ", " LETTER ", " MINUS ", " PLUS " |

# Derivative list information

When you find the derivatives for selected character at the first time, the derivative list will be built for this character and will be saved in memory fo repeated use\. There is the reason, why getting derivatives at the first time takes longer time for several characer\. In the browser's concole, there will be printed information about derivative set\.

If you want to get derivative sets for all ASCII characters, do following:


* Be sure, that in **Find** field is not single character, which invokes finding derivatives for this character\. otherwise, click the **Clear** button\.
* Refresh \(restart\) the application\.
* Click one of the buttons above the text field, which writes displayed character page, including **Page 64 B** or **Page 32 A**\. Every page contains at least one character, which is not derivative of any ASCII character\.
* Click the **Full convert to ASCII** or **Map convert to ASCII** button below the text field\.
* Copy whole text written in browser's console\.

The character map are created by the order:


* Special characters including space\.
* Lower case letters\.
* Upper case letters\.
* Digits\.




