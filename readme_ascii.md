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

The algoritm generating or hardcoding search variants relies on the following assumptions:


* Never actually derivative character should be ommited\.
* Some characters, which actually are not derivatives can be included as derivatives\.
* Every non\-ASCII character can be at most one base characters for avoid ambiguously search for ASCII character for specified non\-ASCII character\.
* For search, the non\-ASCII character names are surrounded with single leading and trailing space\.

# Derivative for letters

Every letter has the one\-character name\. Some derivatives from letters can have other letter names\. Most cyrillic and greek letters can be also treated as ASCII derivatives in transliteration\. The digraphs are converted to nearest single letter, the name for every letter is specified in the table below\. For instance, if you want to find all derivatives for **H**, the program will search for letter, which has the name from this set: \{**H**; **HENG**; **HA**; **ABKHASIAN HA**; **CHI**\}\. In the other words, the **H** letter in derivative context, has five different names\.

| Letter | Latin | Cyrillic | Greek |
| --- | --- | --- | --- |
| A | AE | YA, IA | ALPHA |
| B |   | BE | BETA |
| C |   | TSE, CHE, TSHE |   |
| D | AFRICAN D | DE, DJE, DZHE | DELTA |
| E |   | IE, SCHWA, IOTIFIED E, YAT | EPSILON, LUNATE EPSILON, ETA |
| F |   | EF, FITA, LITTLE YUS, IOTIFIED LITTLE YUS | PHI, DIGAMMA, PAMPHYLIAN DIGAMMA |
| G |   | GHE, GJE | GAMMA |
| H | HENG | HA, ABKHASIAN HA | CHI |
| I | DOTLESS I | II, YI, PALOCHKA | IOTA |
| J | DOTLESS J | JE | YOT |
| K | KRA | KA, BASHKIR KA, KJE | KAPPA, KAI, KOPPA, ARCHAIC KOPPA |
| L |   | EL, LJE | LAMBDA, LAMDA |
| M |   | EM | MU |
| N | ENG | EN, NJE | NU |
| O | OE, OU | IO, OT, BIG YUS, IOTIFIED BIG YUS | OMICRON, OMEGA, ROUND OMEGA |
| P |   | PE | PI, PSI |
| Q |   |   |   |
| R |   | ER | RHO |
| S | ESH, SHARP S | ES, SHA, SHCHA | SIGMA, FINAL SIGMA, LUNATE SIGMA, STIGMA, SHO, SAN |
| T | THORN | TE | THETA, TAU |
| U | STRAIGHT U | YU, IU, UK |   |
| V |   | VE |   |
| W |   |   |   |
| X |   | KSI | XI |
| Y |   | YERU, YERI, IZHITSA | UPSILON |
| Z | EZH, YOGH | ZHE, ZE, DZE, ABKHASIAN DZE | ZETA |

The base search variants are built in two passess\. The first pass generater the two\-phrase variants, the second pass generates one\-phrase variant\.

## Two\-phrase letter variants

For the first pass, there are generated the template consisting of two phrase sets, the first set depends on letter case:


* The first set for lowercase letters:
  * **SMALL LETTER**
  * **MODIFIER LETTER SMALL**
  * **CYRILLIC SMALL**
  * **GREEK SMALL**
  * **SMALL CAPITAL**
* The first set for uppercase letters:
  * **CAPITAL LETTER**
  * **MODIFIER LETTER CAPITAL**
  * **CYRILLIC CAPITAL**
  * **GREEK CAPITAL**
* The second set contains the @ character, which is replaced with the one of the letter name from the table above:
  * **TURNED @**
  * **INVERTED @**
  * **REVERSED @**
  * **OPEN @**
  * **CLOSED @**
  * **SHORT @**
  * **LONG @**
  * **SCRIPT @**
  * **BARRED @**
  * **DOTTED @**

Single variant consists of on phrases from first set and one of the phrases from second set replaced with the letter name\. The number of the variants is the Cartesian product multiplied by number of letter names\.

## Single\-phrase letter variants

For the second pass, there are template veriants consisting of single phrase\. The **@** character represents the letter name\. For the lowercase letter, the generated phrases are following:


* **SMALL CAPITAL @**
* **SMALL LETTER @**
* **CYRILLIC SMALL @**
* **GREEK SMALL @**
* **DOUBLE\-STRUCK SMALL @**
* **SCRIPT SMALL @**
* **BLACK\-LETTER SMALL @**
* **FRAKTUR SMALL @**
* **BOLD SMALL @**
* **ITALIC SMALL @**
* **SANS\-SERIF SMALL @**
* **MONOSPACE SMALL @**

For the uppercase letter, the phrases are following:


* **CAPITAL LETTER @**
* **CYRILLIC CAPITAL @**
* **GREEK CAPITAL @**
* **DOUBLE\-STRUCK CAPITAL @**
* **SCRIPT CAPITAL @**
* **BLACK\-LETTER CAPITAL @**
* **FRAKTUR CAPITAL @**
* **BOLD CAPITAL @**
* **ITALIC CAPITAL @**
* **SANS\-SERIF CAPITAL @**
* **MONOSPACE CAPITAL @**

For instance, assume, that you want for search variants for ASCII character **G** \(upper case, has names **G**, **GHE**, **GJE**, **GAMMA**\)\. For more clarity and readibility, the example assumes, first phrase set consists of 3 elements only: "TURNED", "INVERTED", "REVERSED"\. For the same reason, the templates for single\-phrase variants contains ot the first four items listed above instead of all\. There will be the following two\-phrase variants \(comma is the phrase separator\):


* Two\-ohrase variants
  * CAPITAL LETTER, TURNED G
  * CAPITAL LETTER, TURNED GHE
  * CAPITAL LETTER, TURNED GJE
  * CAPITAL LETTER, TURNED GAMMA
  * CAPITAL LETTER, INVERTED G
  * CAPITAL LETTER, INVERTED GHE
  * CAPITAL LETTER, INVERTED GJE
  * CAPITAL LETTER, INVERTED GAMMA
  * CAPITAL LETTER, REVERSED G
  * CAPITAL LETTER, REVERSED GHE
  * CAPITAL LETTER, REVERSED GJE
  * CAPITAL LETTER, REVERSED GAMMA
  * MODIFIER LETTER CAPITAL, TURNED G
  * MODIFIER LETTER CAPITAL, TURNED GHE
  * MODIFIER LETTER CAPITAL, TURNED GJE
  * MODIFIER LETTER CAPITAL, TURNED GAMMA
  * MODIFIER LETTER CAPITAL, INVERTED G
  * MODIFIER LETTER CAPITAL, INVERTED GHE
  * MODIFIER LETTER CAPITAL, INVERTED GJE
  * MODIFIER LETTER CAPITAL, INVERTED GAMMA
  * MODIFIER LETTER CAPITAL, REVERSED G
  * MODIFIER LETTER CAPITAL, REVERSED GHE
  * MODIFIER LETTER CAPITAL, REVERSED GJE
  * MODIFIER LETTER CAPITAL, REVERSED GAMMA
  * CYRILLIC LETTER CAPITAL, TURNED G
  * CYRILLIC LETTER CAPITAL, TURNED GHE
  * CYRILLIC LETTER CAPITAL, TURNED GJE
  * CYRILLIC LETTER CAPITAL, TURNED GAMMA
  * CYRILLIC LETTER CAPITAL, INVERTED G
  * CYRILLIC LETTER CAPITAL, INVERTED GHE
  * CYRILLIC LETTER CAPITAL, INVERTED GJE
  * CYRILLIC LETTER CAPITAL, INVERTED GAMMA
  * CYRILLIC LETTER CAPITAL, REVERSED G
  * CYRILLIC LETTER CAPITAL, REVERSED GHE
  * CYRILLIC LETTER CAPITAL, REVERSED GJE
  * CYRILLIC LETTER CAPITAL, REVERSED GAMMA
  * GREEK LETTER CAPITAL, TURNED G
  * GREEK LETTER CAPITAL, TURNED GHE
  * GREEK LETTER CAPITAL, TURNED GJE
  * GREEK LETTER CAPITAL, TURNED GAMMA
  * GREEK LETTER CAPITAL, INVERTED G
  * GREEK LETTER CAPITAL, INVERTED GHE
  * GREEK LETTER CAPITAL, INVERTED GJE
  * GREEK LETTER CAPITAL, INVERTED GAMMA
  * GREEK LETTER CAPITAL, REVERSED G
  * GREEK LETTER CAPITAL, REVERSED GHE
  * GREEK LETTER CAPITAL, REVERSED GJE
  * GREEK LETTER CAPITAL, REVERSED GAMMA
* One\-phrase variants:
  * SMALL CAPITAL G
  * SMALL CAPITAL GHE
  * SMALL CAPITAL GJE
  * SMALL CAPITAL GAMMA
  * SMALL LETTER G
  * SMALL LETTER GHE
  * SMALL LETTER GJE
  * SMALL LETTER GAMMA
  * CYRILLIC SMALL G
  * CYRILLIC SMALL GHE
  * CYRILLIC SMALL GJE
  * CYRILLIC SMALL GAMMA
  * GREEK SMALL G
  * GREEK SMALL GHE
  * GREEK SMALL GJE
  * GREEK SMALL GAMMA

# Derivative for other ASCII characters and letter exceptions

The table below describes the search variants for digits and special characters\. It also describes additional included and excluded character numbers for some letter to avoid ambigously\. For letter **e** \(small case\), there are also included additional variant apart from the automatic generated variants as described above\.

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
| " | Variant 4 | " HARD SIGN " |   |
| \# | Variant 1 | " NUMBER SIGN " |   |
| $ | Variant 1 | " DOLLAR " |   |
| % | Variant 1 | " PERCENT " |   |
| & | Variant 1 | " AMPERSAND " |   |
| ' | Characters | 82, 91, 92, 02B9, 02BC |   |
| ' | Variant 1 | " ACUTE ACCENT " | " DOUBLE ", " LETTER " |
| ' | Variant 2 | " ACUTE ACCENT ", " MODIFIER LETTER " | " DOUBLE " |
| ' | Variant 3 | " APOSTROPHE " | " DOUBLE ", " LETTER ", " PRECEDED " |
| ' | Variant 4 | " QUOTATION ", " SINGLE " | " ANGLE ", " LETTER " |
| ' | Variant 5 | " SOFT SIGN " |   |
| ' | Variant 6 | " SEMISOFT SIGN " |   |
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
| \* | Variant 3 | " MULTIPLICATION " |   |
| \+ | Variant 1 | " PLUS " | " MINUS " |
| , | Characters | 02BB, 02BD |   |
| , | Variant 1 | " COMMA " | " DIGIT ", " LETTER ", " MINUS ", " PLUS ", " QUOTATION " |
| \- | Variant 1 | " MINUS " | " PLUS " |
| \- | Variant 2 | " HYPHEN " |   |
| \- | Variant 3 | " DASH " | " VERTICAL " |
| \. | Variant 1 | " FULL STOP " | " DIGIT ", " LETTER ", " NUMBER ", " QUOTATION " |
| \. | Variant 2 | " PERIOD " | " DIGIT ", " LETTER ", " NUMBER ", " QUOTATION " |
| / | Variant 1 | " SLASH " | " BACKSLASH ", " LETTER " |
| / | Variant 2 | " SOLIDUS " | " LETTER ", " REVERSE SOLIDUS " |
| / | Variant 3 | " DIVISION " |   |
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
| < | Characters | 8B, AB, 02C2, 02F1, 2039 | 2A9F |
| < | Variant 1 | " ANGLE BRACKET ", " LEFT " | " CLOSING ", " RIGHT " |
| < | Variant 2 | " ANGLE BRACKET ", " OPENING " | " CLOSING ", " RIGHT " |
| < | Variant 3 | " LESS\-THAN " | " BRACKET ", " GREATER\-THAN " |
| = | Variant 1 | " EQUALS SIGN " | " MINUS ", " PLUS " |
| > | Characters | 9B, BB, 02C3, 02F2, 203A | 2AA0 |
| > | Variant 1 | " ANGLE BRACKET ", " RIGHT " | " LEFT ", " OPENING " |
| > | Variant 2 | " ANGLE BRACKET ", " CLOSING " | " LEFT ", " OPENING " |
| > | Variant 3 | " GREATER\-THAN " | " BRACKET ", " LESS\-THAN " |
| ? | Characters | 2426 | 2A7B, 2A7C |
| ? | Variant 1 | " QUESTION " | " EXCLAMATION ", " LETTER " |
| @ | Variant 1 | " COMMERCIAL AT " |   |
| A | Characters | 04D4, 212B |   |
| C | Characters | A9, 2103 |   |
| D | Characters | D0, 2207, 01F1, 01D6C1, 01D6FB, 01D735, 01D76F, 01D7A9 |   |
| F | Characters | 2109, 2132, 213B |   |
| H | Characters |   | 04A8 |
| I | Characters | 04C0 |   |
| K | Characters | 03D8, 212A |   |
| L | Characters | A3 |   |
| N | Characters | 2116 |   |
| P | Characters | 2117 |   |
| Q | Characters | 024A |   |
| R | Characters | AE, 211E, 211F |   |
| S | Characters | 8A, 2120, 2140 |   |
| T | Characters | 2121, 2122 |   |
| Y | Characters | 9F, A5 |   |
| Z | Characters | 8E |   |
| \[ | Variant 1 | " LEFT ", " SQUARE BRACKET " | " CLOSING ", " RIGHT " |
| \[ | Variant 2 | " OPENING ", " SQUARE BRACKET " | " CLOSING ", " RIGHT " |
| \\ | Characters |   | 01F10F |
| \\ | Variant 1 | " BACKSLASH " | " LETTER " |
| \\ | Variant 2 | " REVERSE SOLIDUS " | " LETTER " |
| \] | Variant 1 | " RIGHT ", " SQUARE BRACKET " | " LEFT ", " OPENING " |
| \] | Variant 2 | " CLOSING ", " SQUARE BRACKET " | " LEFT ", " OPENING " |
| ^ | Characters |   | 2A36 |
| ^ | Variant 1 | " CIRCUMFLEX ACCENT " | " MINUS ", " PLUS " |
| \_ | Variant 1 | " UNDERSCORE " |   |
| \_ | Variant 2 | " LOW LINE " |   |
| \` | Variant 1 | " GRAVE ACCENT " | " DOUBLE ", " LETTER " |
| \` | Variant 2 | " GRAVE ACCENT ", " MODIFIER LETTER " | " DOUBLE " |
| a | Characters | AA, 04D5 |   |
| b | Characters | 03D0 |   |
| c | Characters | A2, 2104 |   |
| d | Characters | F0, 01F3, 0238, 2202, 01D6DB, 01D715, 01D74F, 01D789, 01D7C3 |   |
| e | Characters | 03F5, 03F6, 2107, 2108, 212E , 01D6DC, 01D716, 01D750, 01D78A, 01D7C4 |   |
| e | Variant 1 | " ET ", " LIGATURE " |   |
| f | Characters | 83, 02A9, 214E, FB00, FB01, FB02, FB03, FB04, 01D6DF, 01D719, 01D753, 01D78D, 01D7C7 |   |
| g | Characters | 0264 |   |
| h | Characters | 210E, 210F | 04A9 |
| i | Characters | 2139 |   |
| j | Characters | 03F3 | 01C8, 01CB |
| k | Characters | 03D7, 01D6DE, 01D718, 01D752, 01D78C, 01D7C6 |   |
| l | Characters | 02AA, 02AB, 2114 |   |
| m | Characters | B5 |   |
| o | Characters | BA, 2125, 2126, 2127 , 01D6E1, 01D71B, 01D755, 01D78F, 01D7C9 |   |
| q | Characters | 0239 |   |
| r | Characters | 03F1, 03FC, 01D6E0, 01D71A, 01D754, 01D78E, 01D7C8 |   |
| s | Characters | 9A, FB05, FB06, 01D6DD, 01D717, 01D751, 01D78B, 01D7C5 |   |
| v | Characters | 2123 |   |
| z | Characters | 9E | 01C5, 01F2 |
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

# Derivative list in Unicode browser

If you want to get derivative set for specified ASCII character, do following:


* Click the **Clear** button\.
* Input in **Find** field a single ASCII character, which you want to show derivatives\.
* Click the **Find** button\.

# ASCII page coverage

You can check the ASCII character page coverage by doing as following:


* Click one of the buttons above the text field, which writes displayed character page, including **Page 64 B** or **Page 32 A**\. Every page contains at least one character, which is not derivative of any ASCII character\.
* Click the Full convert to ASCII or Map convert to ASCII button below the text field\.

# Derivative information in Generator

The generator has implemented the derivative information as described in this document\. The generated **char\.js** file contains the derivative informaction already, based upon the character numbers and character names\. This approach allows to quickly finding the derivative characters for desired ASCII character or finfing ASCII character for desired character\.

You can test this algorithm both before and after **char\.js** contents generation\. While generation, the conflicts will be indicated by the pop\-up messages and messages in the web browser console\. The conflicts should not exisits\. The conflict may occur when the Unicode data files are updated and the derivative\-finding rules should be corrected to avoid the conflicts\.

Below the **char\.js** content field, there are additional text field with buttons representing all ASCII characters\. These button are ondered by ASCII character number and are separated the numbers, letters and other characters\.

In order to show the rules for desired ASCII character, you should clich one of these buttons\. The text below the button set will show the following information:


* **The derivatife of the ASCII character** \- The set of numbers within the **\{** and **\}** characters\. The information will be written after generating only, otherwise, the set will be empty\.
* **The exceptionally included characters regardless the rules** \- Each number will be preceeded by the **plus** character\.
* **The exceptionally excluded characters regardless the rules** \- Each number will be preceeded by the **minus** character\.
* **The character name rules including both standard rules and additional rules** \- Each line contains single variant and every name phrase are within the **\[** and **\]** characters\. The included phrase are indicated by the **plus** character and the excluded ohrase are indicated by the **minus** character\.




