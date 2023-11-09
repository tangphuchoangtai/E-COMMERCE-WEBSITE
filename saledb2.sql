-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: saledb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Giay','adidas'),(2,'Quan',NULL),(3,'Ao',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_comment_idx` (`product_id`),
  KEY `fk_user_comment_idx` (`user_id`),
  CONSTRAINT `fk_product_comment` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_user_comment` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `unit_price` decimal(10,0) DEFAULT '0',
  `num` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ORDERDETAIL_ORDER_idx` (`order_id`),
  KEY `FK_ORDERDETAIL_PRODUCT_idx` (`product_id`),
  CONSTRAINT `FK_ORDERDETAIL_ORDER` FOREIGN KEY (`order_id`) REFERENCES `sale_order` (`id`),
  CONSTRAINT `FK_ORDERDETAIL_PRODUCT` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (5,4,1,12500000,'1'),(6,4,2,21000000,'1'),(7,4,3,17000000,'1'),(8,5,1,12500000,'1'),(9,5,3,17000000,'1'),(10,5,7,10540000,'1'),(11,6,2,21000000,'1'),(12,7,5,18600000,'1'),(13,7,6,12990000,'3'),(14,8,1,12500000,'1'),(15,8,2,21000000,'2'),(16,8,3,17000000,'1'),(17,9,1,12500000,'1'),(18,9,2,21000000,'2'),(19,10,4,28000000,'1'),(20,10,5,18600000,'5'),(21,11,1,12500000,'2'),(22,11,2,21000000,'2'),(23,11,3,17000000,'1'),(24,13,2,0,'0'),(25,13,1,0,'0');
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_tag`
--

DROP TABLE IF EXISTS `prod_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `f1_idx` (`product_id`),
  KEY `f2_idx` (`tag_id`),
  CONSTRAINT `f1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `f2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_tag`
--

LOCK TABLES `prod_tag` WRITE;
/*!40000 ALTER TABLE `prod_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `prod_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `price` decimal(10,0) DEFAULT '0',
  `manufacturer` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `image` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PRODUCE_CATEGORY_idx` (`category_id`),
  CONSTRAINT `FK_PRODUCE_CATEGORY` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Project Rock Mesh Varsity','Thiết bị đào tạo Project Rock được tạo ra để giúp bạn tìm ra ranh giới, sau đó vượt qua chúng',850000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335207/rdxukwfsxztyqismzf42.webp',NULL,NULL,3),(2,'Project Rock Champ',' Mọi thứ trong bộ sưu tập này đều được đích thân Dwayne Johnson, người làm việc chăm chỉ nhất trong phòng, phê duyệt',350000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335067/v1mobt9dfr0fcgcxoxsq.webp',NULL,NULL,3),(3,'We Play To Protect This House','Mọi người đều tạo ra đồ họa Ts...nhưng Under Armour làm cho chúng tốt hơn',650000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335112/l5ouma7xqzlzigjxzgrm.webp',NULL,NULL,3),(4,'Nike Club Fleece','Tìm trạng thái thoải mái của bạn trong chiếc quần sooc vải bông mềm mại của chúng tôi',300000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694334378/apviy1blu0stb6j92lmn.webp',NULL,NULL,2),(5,'Nike Life','Là một phần trong bộ sưu tập của chúng tôi, những chiếc quần thợ mộc này được thiết kế cho tất cả những việc bạn làm trong cuộc sống ngoài thể thao',500000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694334319/ioos6dnkqrdwrmo3jvnd.jpg',NULL,NULL,2),(6,'Nike Sportswear ','Áo thun thể thao giúp bạn nổi bật với áo cotton mềm mại và logo cổ điển trên ngực.',12990000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694334177/wtzvshoaidh85xsfseax.webp',NULL,NULL,3),(7,'Nike Sportswear Club','Áo thun Sportswear Club được làm bằng vải cotton hàng ngày của chúng tôi và kiểu dáng vừa vặn cổ điển mang lại cảm giác quen thuộc ngay khi lấy ra khỏi túi',400000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694333960/z29ba9khxha5tmibk2mz.webp',NULL,NULL,3),(25,'Nike Sportswear Windrunner','Áo khoác thể thao Windrunner cập nhật chiếc áo gió chạy bộ đầu tiên của chúng tôi bằng vải nhẹ làm từ vật liệu tái chế',800000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694334139/acozboomqvagukbonwtc.webp',NULL,NULL,3),(26,'Sportstyle Tricot Jacket','Mọi người đều cần một bộ đồ thể thao. Chúng giữ cho cơ bắp của bạn nóng lên và sẵn sàng vận động',890000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335268/eilx1xymeu9zvmeg1j1u.webp',NULL,NULL,3),(27,'Unstoppable Tapered','Sự khác biệt nằm ở các chi tiết—từ loại vải cực kỳ thoải mái đến lớp hoàn thiện chống thấm nước, nhờ đó chúng khô nhanh hơn—tất cả đều có để giúp bạn khỏe hơn.',700000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335503/qqdbb5gvftuhnmwuur4y.webp',NULL,NULL,2),(28,'Unstoppable Fleece','Được tạo ra từ hiệu suất với chất liệu vải linh hoạt mang lại cảm giác dễ chịu, dễ thở và đồng hành cùng bạn trong mọi chuyển động lớn—bạn sẽ sẵn sàng ra sân.',420000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335534/qpm49kwwvmkss9vjmk32.webp',NULL,NULL,2),(29,'Nike Sportswear Tech Fleece ','Hoàn hảo cho thời tiết ấm áp hơn, thiết kế khóa kéo toàn phần cổ điển này mang đến cho bạn nét DNA đặc trưng của Lông cừu Công nghệ trong chất liệu vải dệt kim nhẹ, co giãn',950000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694352237/lvio7szkrujujwqenfgr.webp',NULL,NULL,3),(30,'Nike Trail Magic Hour','Sản phẩm này được làm bằng ít nhất 75% vật liệu bền vững, sử dụng hỗn hợp cả sợi polyester tái chế và sợi bông hữu cơ.',790000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694335847/cp0499hrzr1vb6hovyn2.webp',NULL,NULL,3),(31,'Basketball shoes KD16','Khi niềm khao khát chơi game của bạn không thể được thỏa mãn, hãy mua KD16. ',3000000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694336032/e1hmkmuj1dk131xqif5h.webp',NULL,NULL,1),(32,'Nike Dunk Low Premium','Được tạo ra dành cho gỗ cứng nhưng lại được ưa chuộng trên đường phố, biểu tượng b-ball của thập niên 80 này trở lại với các chi tiết cổ điển và sự tinh tế của những chiếc vòng quay.',2800000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694336103/qhsiboeygboquwgrgr5z.webp',NULL,NULL,1),(33,'Nike Dunk Low','Tạo ấn tượng cho vẻ ngoài của bạn với sự tinh tế của những vòng quay ngược với Dunk Low.',2600000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694336199/quyzd9r0c67fyw3wzrnw.webp',NULL,NULL,1),(34,'Nike Air Max 270','Phong cách sống đầu tiên của Nike Air Max mang đến cho bạn phong cách, sự thoải mái và thái độ tuyệt vời trong Nike Air Max 270',2950000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694336255/ujfvvnhtfvkdvrphnof7.webp',NULL,NULL,1),(35,'Sabrina 1 \"Spark\"','Trò chơi của Sabrina Ionescu rất độc đáo, khó xác định và được xây dựng bằng một tay nghề không thể phủ nhận',3300000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694336342/zhfuxtsnj1leqyiqvn0i.webp',NULL,NULL,1),(36,'Nike G.T. Cut 2','Trong trò chơi ngày nay, những con sên chậm chân sẽ bị phát hiện và lộ diện. Người tạo không gian ở trên sàn',3850000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694336417/p34cc4nwv8j7elwxcaxl.webp',NULL,NULL,1),(37,'LeBron 20 UNINTERRUPTED ','Hai thập kỷ trong sự nghiệp vượt qua mọi kỳ vọng cao cả, LeBron James đã từ chối chấp nhận bất cứ điều gì kém hơn sự vĩ đại',4500000,NULL,'https://res.cloudinary.com/dazrpfw2w/image/upload/v1694340686/qasvv5jjrnuz73a8zenw.webp',NULL,NULL,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_order`
--

DROP TABLE IF EXISTS `sale_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,0) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ORDER_USER_idx` (`user_id`),
  CONSTRAINT `FK_ORDER_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_order`
--

LOCK TABLES `sale_order` WRITE;
/*!40000 ALTER TABLE `sale_order` DISABLE KEYS */;
INSERT INTO `sale_order` VALUES (4,50500000,'2020-02-03 00:00:00',7),(5,40040000,'2020-02-03 00:00:00',7),(6,21000000,'2020-02-03 00:00:00',7),(7,57570000,'2020-02-04 00:00:00',7),(8,71500000,'2020-02-05 00:00:00',6),(9,54500000,'2020-02-05 00:00:00',7),(10,121000000,'2020-02-07 00:00:00',6),(11,84000000,'2020-02-07 00:00:00',8),(12,100,'2020-11-17 18:43:31',NULL),(13,100,'2020-11-17 18:48:11',NULL);
/*!40000 ALTER TABLE `sale_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagcol` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `active` bit(1) DEFAULT b'1',
  `user_role` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `avatar` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'tai','hoang','tangphuchoangtai@gmail.com','0389550035','htai','$2a$10$5X9k5N1sTc1/CjVH5XJoje3QMYijH3ETpgkox00R0MdPaJPPrf7wO',_binary '','ROLE_ADMIN',''),(7,'Trung','Nghia','nghiatrung@gmail.com','123456','nghiatrung','$2a$10$RL0rTJd2ThLmCzYHMhz9aOBBZfA8ybYpa3Ugl9ds.Pkb8AjtSHWua',_binary '','ROLE_ADMIN',''),(8,'tu','ra','tura@gmail.com','1111111111','tura','$2a$10$qv8SsUwRnp/YhPWTPqdgp.MXJ01hcW4ji6wKvP6.qkWWx1ZxhqxyG',_binary '','ROLE_USER',''),(9,'1','1','1','1','1','$2a$10$DXU0hfyYyDsN3.tENZ7SxejckPPLw5hrWgg96vi4XBE8khTpjTCwS',NULL,'ROLE_USER','https://res.cloudinary.com/dazrpfw2w/image/upload/v1694260081/c16nqsumaheslqz72gcg.png'),(10,'trung','honr','1','1','trung','$2a$10$VadNqbnqwqAS.6HeWedukeBNcTmD8wOqYJk7.kgV7Ed3WZvXu2mW6',NULL,'ROLE_USER','https://res.cloudinary.com/dazrpfw2w/image/upload/v1694263025/tujpbhcnnbzbdblbwr0c.jpg'),(12,'A','a','a','123','VanA','$2a$10$cW8Fi5JbtIzqplfrCt.Aiu3f4JF9GinIFHWZVKCeUoCn6AUe88c7S',NULL,'ROLE_USER','https://res.cloudinary.com/dazrpfw2w/image/upload/v1694400156/rzit1sdahfnk3cidf5me.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-23  9:45:45
