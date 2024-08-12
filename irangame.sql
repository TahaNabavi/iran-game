-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2024 at 09:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `irangame`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `type` varchar(191) NOT NULL,
  `username` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `acc_id` varchar(191) DEFAULT NULL,
  `acc_name` varchar(191) DEFAULT NULL,
  `trade_link` varchar(191) DEFAULT NULL,
  `backup_code` varchar(191) DEFAULT NULL,
  `dlc_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `market_id` int(11) DEFAULT NULL,
  `inapp_price_id` int(11) DEFAULT NULL,
  `price_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dlc_tips`
--

CREATE TABLE `dlc_tips` (
  `id` int(11) NOT NULL DEFAULT 1,
  `text` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dlc_tips`
--

INSERT INTO `dlc_tips` (`id`, `text`) VALUES
(1, 'چند نکته');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `logo` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `pc_minimum` text NOT NULL,
  `pc_recommended` text NOT NULL,
  `metacritic_score` int(11) NOT NULL,
  `metacritic_url` varchar(191) NOT NULL,
  `help` longtext NOT NULL,
  `help_title` varchar(191) NOT NULL,
  `bg` varchar(191) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0,
  `purch` int(11) NOT NULL DEFAULT 0,
  `image_one` varchar(191) NOT NULL,
  `image_two` varchar(191) NOT NULL,
  `image_three` varchar(191) NOT NULL,
  `isTop` int(11) NOT NULL DEFAULT 0,
  `link` varchar(191) NOT NULL,
  `about_game` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `app_id`, `title`, `logo`, `description`, `pc_minimum`, `pc_recommended`, `metacritic_score`, `metacritic_url`, `help`, `help_title`, `bg`, `discount`, `purch`, `image_one`, `image_two`, `image_three`, `isTop`, `link`, `about_game`) VALUES
(1, 1245620, 'ELDEN RING', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_184x69.jpg?t=1721682743', 'THE NEW FANTASY ACTION RPG.<br>Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.<h2 class=\\\"bb_tag\\\">• A Vast World Full of Excitement</h2>A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.<h2 class=\\\"bb_tag\\\">• Create your Own Character</h2>In addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.<h2 class=\\\"bb_tag\\\">• An Epic Drama Born from a Myth</h2>A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.<h2 class=\\\"bb_tag\\\">• Unique Online Play that Loosely Connects You to Others</h2>In addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.', '<strong>Minimum:</strong><br><ul class=\\\"bb_ul\\\"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Windows 10<br></li><li><strong>Processor:</strong> INTEL CORE I5-8400 or AMD RYZEN 3 3300X<br></li><li><strong>Memory:</strong> 12 GB RAM<br></li><li><strong>Graphics:</strong> NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB<br></li><li><strong>DirectX:</strong> Version 12<br></li><li><strong>Storage:</strong> 60 GB available space<br></li><li><strong>Sound Card:</strong> Windows Compatible Audio Device<br></li><li><strong>Additional Notes:</strong> </li></ul>', '<strong>Recommended:</strong><br><ul class=\\\"bb_ul\\\"><li>Requires a 64-bit processor and operating system<br></li><li><strong>OS:</strong> Windows 10/11<br></li><li><strong>Processor:</strong> INTEL CORE I7-8700K or AMD RYZEN 5 3600X<br></li><li><strong>Memory:</strong> 16 GB RAM<br></li><li><strong>Graphics:</strong> NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB<br></li><li><strong>DirectX:</strong> Version 12<br></li><li><strong>Storage:</strong> 60 GB available space<br></li><li><strong>Sound Card:</strong> Windows Compatible Audio Device<br></li><li><strong>Additional Notes:</strong> </li></ul>', 94, 'https://www.metacritic.com/game/pc/elden-ring?ftag=MCD-06-10aaa1f', '', '', '', 0, 0, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg?t=1721682743', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg?t=1721682743', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1721682743', 1, '', '<h1>ELDEN RING Shadow of the Erdtree Edition</h1><p><img src=\\\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/extras/ER_SHADOW-OF-THE-ERDTREE-EDITION_EN.gif?t=1721682743\\\" /><br>ELDEN RING Shadow of the Erdtree Edition includes:<br><ul class=\\\"bb_ul\\\"><li>ELDEN RING<br></li><li>ELDEN RING Shadow of the Erdtree expansion</li></ul></p><br><h1>ELDEN RING Shadow of the Erdtree Deluxe Edition</h1><p><img src=\\\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/extras/ER_SHADOW-OF-THE-ERDTREE-DELUXE-EDITION_EN.gif?t=1721682743\\\" /><br>ELDEN RING Shadow of the Erdtree Deluxe Edition includes:<br><ul class=\\\"bb_ul\\\"><li>ELDEN RING<br></li><li>ELDEN RING Shadow of the Erdtree expansion<br></li><li>ELDEN RING Digital Artbook &amp; Original Soundtrack<br></li><li>ELDEN RING Shadow of the Erdtree Artbook &amp; Soundtrack</li></ul></p><br><h1>About the Game</h1><img src=\\\"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/extras/ER_Steam_Gif_616x260.gif?t=1721682743\\\" /><br><br>THE NEW FANTASY ACTION RPG.<br>Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.<h2 class=\\\"bb_tag\\\">• A Vast World Full of Excitement</h2>A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.<h2 class=\\\"bb_tag\\\">• Create your Own Character</h2>In addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.<h2 class=\\\"bb_tag\\\">• An Epic Drama Born from a Myth</h2>A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.<h2 class=\\\"bb_tag\\\">• Unique Online Play that Loosely Connects You to Others</h2>In addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.');

-- --------------------------------------------------------

--
-- Table structure for table `games_dlc`
--

CREATE TABLE `games_dlc` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `games_dlc`
--

INSERT INTO `games_dlc` (`id`, `name`, `image`, `discount`) VALUES
(1, 'Shadow of the Erdtree', 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2778580/header.jpg?t=1721683108', 0);

-- --------------------------------------------------------

--
-- Table structure for table `game_tags`
--

CREATE TABLE `game_tags` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `game_tags`
--

INSERT INTO `game_tags` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'RPG');

-- --------------------------------------------------------

--
-- Table structure for table `game_tips`
--

CREATE TABLE `game_tips` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `body` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `game_tips`
--

INSERT INTO `game_tips` (`id`, `title`, `body`) VALUES
(1, 'موضوع', 'متن'),
(2, 'موضوع', 'متن');

-- --------------------------------------------------------

--
-- Table structure for table `inapp`
--

CREATE TABLE `inapp` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `logo` varchar(191) NOT NULL,
  `bg` varchar(191) NOT NULL,
  `pin` tinyint(1) NOT NULL DEFAULT 0,
  `buy_help_title` varchar(191) NOT NULL DEFAULT '',
  `buy_help_body` text NOT NULL DEFAULT '',
  `buy_username` tinyint(1) NOT NULL DEFAULT 1,
  `buy_password` tinyint(1) NOT NULL DEFAULT 1,
  `buy_id` tinyint(1) NOT NULL DEFAULT 0,
  `buy_name` tinyint(1) NOT NULL DEFAULT 0,
  `buy_email` tinyint(1) NOT NULL DEFAULT 0,
  `buy_backup_code` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inapp`
--

INSERT INTO `inapp` (`id`, `title`, `logo`, `bg`, `pin`, `buy_help_title`, `buy_help_body`, `buy_username`, `buy_password`, `buy_id`, `buy_name`, `buy_email`, `buy_backup_code`) VALUES
(1, 'دیسکورد', 'https://yt3.googleusercontent.com/Ws_BpAWD46mOjCW3XCnsZ0YmghW-6fhMf6d9pvCvb4g8JJftgvL54039U1mgh31OchR4ApMTezc=s900-c-k-c0x00ffffff-no-rj', 'https://i.ytimg.com/vi/7V5jdOjWVU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCLmAxRosK3Ltbar9OdDhUHFuDug', 0, 'اگر تایید دو مرحله ای اکانتتون فعال هست لطفا دو عدد کد بک آپ وارد کنید', '', 1, 1, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `inapp_item`
--

CREATE TABLE `inapp_item` (
  `id` int(11) NOT NULL,
  `inapp_id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL DEFAULT '',
  `logo` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inapp_item`
--

INSERT INTO `inapp_item` (`id`, `inapp_id`, `title`, `logo`) VALUES
(1, 1, 'نیترو', 'https://digiseller.mycdn.ink/preview/1084128/p1_3491691_e2120529.png'),
(2, 1, 'بوست', 'https://ih1.redbubble.net/image.4637828320.0590/raf,360x360,075,t,fafafa:ca443f4786.u2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `inapp_prices`
--

CREATE TABLE `inapp_prices` (
  `id` int(11) NOT NULL,
  `inapp_item_id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `pt_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inapp_prices`
--

INSERT INTO `inapp_prices` (`id`, `inapp_item_id`, `title`, `amount`, `pt_id`) VALUES
(1, 1, 'یک ماه - کلاسیک', 4.99, 1),
(2, 1, 'دوارده ماه - کلاسیک', 19.99, 1),
(3, 2, 'دو بوست', 3, 1),
(4, 2, 'جهار بوست', 7, 1),
(5, 2, 'هفت بوست', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `item_prices`
--

CREATE TABLE `item_prices` (
  `id` int(11) NOT NULL,
  `pt_id` int(11) NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_prices`
--

INSERT INTO `item_prices` (`id`, `pt_id`, `amount`) VALUES
(1, 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `market`
--

CREATE TABLE `market` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `logo` text NOT NULL,
  `pin` tinyint(1) NOT NULL DEFAULT 0,
  `app_id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `pt_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `market`
--

INSERT INTO `market` (`id`, `game_id`, `title`, `logo`, `pin`, `app_id`, `amount`, `pt_id`) VALUES
(1, NULL, 'Mann Co. Supply Crate Key', 'https://community.akamai.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ/360fx360f', 0, 440, 2.19, 1);

-- --------------------------------------------------------

--
-- Table structure for table `market_help`
--

CREATE TABLE `market_help` (
  `id` int(11) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `market_help`
--

INSERT INTO `market_help` (`id`, `body`) VALUES
(1, 'لطفا قبل از خرید حتما مطمئن شوید که لینک درستی را وارد کنید');

-- --------------------------------------------------------

--
-- Table structure for table `price_types`
--

CREATE TABLE `price_types` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `currency` varchar(191) NOT NULL,
  `currency_code` int(11) NOT NULL,
  `country_code` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL,
  `to_irr` double NOT NULL,
  `added_price_inapp` double NOT NULL DEFAULT 0,
  `added_price_games` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `price_types`
--

INSERT INTO `price_types` (`id`, `name`, `currency`, `currency_code`, `country_code`, `image`, `to_irr`, `added_price_inapp`, `added_price_games`) VALUES
(1, 'ریجن اصلی - دلار', 'USD', 1, 'US', '', 63000, 20000, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `add_price_market` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `avatar` varchar(191) NOT NULL,
  `number` varchar(191) DEFAULT NULL,
  `wallet` varchar(191) NOT NULL DEFAULT '0',
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `rank` int(11) NOT NULL DEFAULT 0,
  `exp` varchar(191) NOT NULL DEFAULT '0',
  `verify_data` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `number`, `wallet`, `verified`, `rank`, `exp`, `verify_data`, `created_at`, `updated_at`) VALUES
(1, '@_sayyedtahanabavi793', 'sayyedtahanabavi@gmail.com', '', 'https://lh3.googleusercontent.com/a/ACg8ocKdm-_HZXvbEJO4AR1DPpSzg8lsB_Kqsy1iGlEn6idVvk-TkA=s96-c', NULL, '0', 0, 0, '0', NULL, '2024-08-11 18:11:27.728', '2024-08-11 18:11:27.728');

-- --------------------------------------------------------

--
-- Table structure for table `_gamedlcprices`
--

CREATE TABLE `_gamedlcprices` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_gamedlcprices`
--

INSERT INTO `_gamedlcprices` (`A`, `B`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `_gameprices`
--

CREATE TABLE `_gameprices` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_gameprices`
--

INSERT INTO `_gameprices` (`A`, `B`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `_gamestogames_dlc`
--

CREATE TABLE `_gamestogames_dlc` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_gamestogames_dlc`
--

INSERT INTO `_gamestogames_dlc` (`A`, `B`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `_gametags`
--

CREATE TABLE `_gametags` (
  `A` int(11) NOT NULL,
  `B` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_gametags`
--

INSERT INTO `_gametags` (`A`, `B`) VALUES
(1, 1),
(2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_user_id_fkey` (`user_id`),
  ADD KEY `cart_dlc_id_fkey` (`dlc_id`),
  ADD KEY `cart_game_id_fkey` (`game_id`),
  ADD KEY `cart_market_id_fkey` (`market_id`),
  ADD KEY `cart_inapp_price_id_fkey` (`inapp_price_id`),
  ADD KEY `cart_price_id_fkey` (`price_id`);

--
-- Indexes for table `dlc_tips`
--
ALTER TABLE `dlc_tips`
  ADD UNIQUE KEY `dlc_tips_text_key` (`text`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `games_app_id_key` (`app_id`),
  ADD UNIQUE KEY `games_title_key` (`title`);

--
-- Indexes for table `games_dlc`
--
ALTER TABLE `games_dlc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_tags`
--
ALTER TABLE `game_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_tags_name_key` (`name`);

--
-- Indexes for table `game_tips`
--
ALTER TABLE `game_tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inapp`
--
ALTER TABLE `inapp`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inapp_title_key` (`title`);

--
-- Indexes for table `inapp_item`
--
ALTER TABLE `inapp_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inapp_item_inapp_id_fkey` (`inapp_id`);

--
-- Indexes for table `inapp_prices`
--
ALTER TABLE `inapp_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inapp_prices_inapp_item_id_fkey` (`inapp_item_id`),
  ADD KEY `inapp_prices_pt_id_fkey` (`pt_id`);

--
-- Indexes for table `item_prices`
--
ALTER TABLE `item_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_prices_pt_id_fkey` (`pt_id`);

--
-- Indexes for table `market`
--
ALTER TABLE `market`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `market_title_key` (`title`),
  ADD KEY `market_game_id_fkey` (`game_id`),
  ADD KEY `market_pt_id_fkey` (`pt_id`);

--
-- Indexes for table `market_help`
--
ALTER TABLE `market_help`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_types`
--
ALTER TABLE `price_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `price_types_currency_key` (`currency`),
  ADD UNIQUE KEY `price_types_currency_code_key` (`currency_code`),
  ADD UNIQUE KEY `price_types_country_code_key` (`country_code`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_key` (`username`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD UNIQUE KEY `users_number_key` (`number`);

--
-- Indexes for table `_gamedlcprices`
--
ALTER TABLE `_gamedlcprices`
  ADD UNIQUE KEY `_GameDlcPrices_AB_unique` (`A`,`B`),
  ADD KEY `_GameDlcPrices_B_index` (`B`);

--
-- Indexes for table `_gameprices`
--
ALTER TABLE `_gameprices`
  ADD UNIQUE KEY `_GamePrices_AB_unique` (`A`,`B`),
  ADD KEY `_GamePrices_B_index` (`B`);

--
-- Indexes for table `_gamestogames_dlc`
--
ALTER TABLE `_gamestogames_dlc`
  ADD UNIQUE KEY `_gamesTogames_dlc_AB_unique` (`A`,`B`),
  ADD KEY `_gamesTogames_dlc_B_index` (`B`);

--
-- Indexes for table `_gametags`
--
ALTER TABLE `_gametags`
  ADD UNIQUE KEY `_GameTags_AB_unique` (`A`,`B`),
  ADD KEY `_GameTags_B_index` (`B`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `games_dlc`
--
ALTER TABLE `games_dlc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `game_tags`
--
ALTER TABLE `game_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `game_tips`
--
ALTER TABLE `game_tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inapp`
--
ALTER TABLE `inapp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inapp_item`
--
ALTER TABLE `inapp_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inapp_prices`
--
ALTER TABLE `inapp_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `item_prices`
--
ALTER TABLE `item_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `market`
--
ALTER TABLE `market`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `market_help`
--
ALTER TABLE `market_help`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `price_types`
--
ALTER TABLE `price_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_dlc_id_fkey` FOREIGN KEY (`dlc_id`) REFERENCES `games_dlc` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_inapp_price_id_fkey` FOREIGN KEY (`inapp_price_id`) REFERENCES `inapp_prices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_market_id_fkey` FOREIGN KEY (`market_id`) REFERENCES `market` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `item_prices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `inapp_item`
--
ALTER TABLE `inapp_item`
  ADD CONSTRAINT `inapp_item_inapp_id_fkey` FOREIGN KEY (`inapp_id`) REFERENCES `inapp` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `inapp_prices`
--
ALTER TABLE `inapp_prices`
  ADD CONSTRAINT `inapp_prices_inapp_item_id_fkey` FOREIGN KEY (`inapp_item_id`) REFERENCES `inapp_item` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `inapp_prices_pt_id_fkey` FOREIGN KEY (`pt_id`) REFERENCES `price_types` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `item_prices`
--
ALTER TABLE `item_prices`
  ADD CONSTRAINT `item_prices_pt_id_fkey` FOREIGN KEY (`pt_id`) REFERENCES `price_types` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `market`
--
ALTER TABLE `market`
  ADD CONSTRAINT `market_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `market_pt_id_fkey` FOREIGN KEY (`pt_id`) REFERENCES `price_types` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `_gamedlcprices`
--
ALTER TABLE `_gamedlcprices`
  ADD CONSTRAINT `_GameDlcPrices_A_fkey` FOREIGN KEY (`A`) REFERENCES `games_dlc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_GameDlcPrices_B_fkey` FOREIGN KEY (`B`) REFERENCES `item_prices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_gameprices`
--
ALTER TABLE `_gameprices`
  ADD CONSTRAINT `_GamePrices_A_fkey` FOREIGN KEY (`A`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_GamePrices_B_fkey` FOREIGN KEY (`B`) REFERENCES `item_prices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_gamestogames_dlc`
--
ALTER TABLE `_gamestogames_dlc`
  ADD CONSTRAINT `_gamesTogames_dlc_A_fkey` FOREIGN KEY (`A`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_gamesTogames_dlc_B_fkey` FOREIGN KEY (`B`) REFERENCES `games_dlc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_gametags`
--
ALTER TABLE `_gametags`
  ADD CONSTRAINT `_GameTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `game_tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_GameTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
