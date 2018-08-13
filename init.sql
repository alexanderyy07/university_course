/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.57 : Database - my_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`my_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `my_db`;

/*Table structure for table `cbg_course` */

CREATE TABLE `cbg_course` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cbg_course` */

/*Table structure for table `cbg_enrollment` */

CREATE TABLE `cbg_enrollment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_enrollment` (`course_id`,`student_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cbg_enrollment` */

/*Table structure for table `cbg_student` */

CREATE TABLE `cbg_student` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `cbg_student` */

/*Table structure for table `period` */

CREATE TABLE `period` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `semester` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `period` */

insert  into `period`(`id`,`name`,`year`,`semester`) values (1,'Spring 2017',2017,'02');
insert  into `period`(`id`,`name`,`year`,`semester`) values (2,'Fall 2017',2017,'01');

/*Table structure for table `sfd20170148_chat` */

CREATE TABLE `sfd20170148_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `pos` varchar(20) DEFAULT NULL,
  `text` text,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170148_chat` */

/*Table structure for table `sfd20170148_homework` */

CREATE TABLE `sfd20170148_homework` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170148_homework` */

insert  into `sfd20170148_homework`(`id`,`title`,`details`) values (1,'Test',NULL);
insert  into `sfd20170148_homework`(`id`,`title`,`details`) values (2,'Homework Oct 24','Solve the problem16 on page 44.');

/*Table structure for table `sfd20170148_material` */

CREATE TABLE `sfd20170148_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) DEFAULT NULL,
  `description` text,
  `path` text,
  `size` bigint(20) DEFAULT NULL,
  `uploaded_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170148_material` */

/*Table structure for table `sfd20170148_students` */

CREATE TABLE `sfd20170148_students` (
  `student_id` int(11) NOT NULL,
  `1_hw` text,
  `1_score` double DEFAULT NULL,
  `2_hw` text,
  `2_score` double DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170148_students` */

insert  into `sfd20170148_students`(`student_id`,`1_hw`,`1_score`,`2_hw`,`2_score`) values (1,NULL,NULL,NULL,NULL);

/*Table structure for table `sfd20170150_chat` */

CREATE TABLE `sfd20170150_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `pos` varchar(20) DEFAULT NULL,
  `text` text,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170150_chat` */

/*Table structure for table `sfd20170150_homework` */

CREATE TABLE `sfd20170150_homework` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170150_homework` */

/*Table structure for table `sfd20170150_material` */

CREATE TABLE `sfd20170150_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) DEFAULT NULL,
  `description` text,
  `path` text,
  `size` bigint(20) DEFAULT NULL,
  `uploaded_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170150_material` */

/*Table structure for table `sfd20170150_students` */

CREATE TABLE `sfd20170150_students` (
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd20170150_students` */

insert  into `sfd20170150_students`(`student_id`) values (34);

/*Table structure for table `sfd2017015_chat` */

CREATE TABLE `sfd2017015_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `pos` varchar(20) DEFAULT NULL,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd2017015_chat` */

/*Table structure for table `sfd2017015_homework` */

CREATE TABLE `sfd2017015_homework` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `sfd2017015_homework` */

insert  into `sfd2017015_homework`(`id`,`title`,`details`) values (20,'Easy Exercise','Solve the problem on page 32.');
insert  into `sfd2017015_homework`(`id`,`title`,`details`) values (21,'Easy Exercise','Solve the problem4 on page 23.');
insert  into `sfd2017015_homework`(`id`,`title`,`details`) values (22,'Test','Develop a sorting program by using quick sort algorithm.');
insert  into `sfd2017015_homework`(`id`,`title`,`details`) values (23,'Difficult Homework','Make a dummy using c.');
insert  into `sfd2017015_homework`(`id`,`title`,`details`) values (24,'Easy Homework','Print your name on the screen.');
insert  into `sfd2017015_homework`(`id`,`title`,`details`) values (25,'asdf','sdaf');

/*Table structure for table `sfd2017015_material` */

CREATE TABLE `sfd2017015_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) DEFAULT NULL,
  `description` text,
  `path` text,
  `size` bigint(20) DEFAULT NULL,
  `uploaded_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `sfd2017015_material` */

insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (10,18,NULL,'sdf.docx',2005,'2017-10-06 23:46:58');
insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (11,18,NULL,'iOS Swift Game Development Cookbook Second Edition.pdf',4146309,'2017-10-06 23:47:02');
insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (12,18,NULL,'CellTrack 3 EN.pdf',144778,'2017-10-06 23:47:09');
insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (13,2,NULL,'iOS Swift Game Development Cookbook Second Edition.pdf',4146309,'2017-10-07 00:07:25');
insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (14,2,NULL,'1.cpp',3601,'2017-10-10 04:07:11');
insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (20,2,NULL,'mail.txt',134,'2017-10-10 04:08:44');
insert  into `sfd2017015_material`(`id`,`teacher_id`,`description`,`path`,`size`,`uploaded_time`) values (26,2,NULL,'mail.txt',134,'2017-10-10 04:20:56');

/*Table structure for table `sfd2017015_students` */

CREATE TABLE `sfd2017015_students` (
  `student_id` int(11) NOT NULL,
  `25_hw` text,
  `25_score` double DEFAULT NULL,
  `20_hw` text,
  `20_score` double DEFAULT NULL,
  `21_hw` text,
  `21_score` double DEFAULT NULL,
  `22_hw` text,
  `22_score` double DEFAULT NULL,
  `23_hw` text,
  `23_score` double DEFAULT NULL,
  `24_hw` text,
  `24_score` double DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd2017015_students` */

insert  into `sfd2017015_students`(`student_id`,`25_hw`,`25_score`,`20_hw`,`20_score`,`21_hw`,`21_score`,`22_hw`,`22_score`,`23_hw`,`23_score`,`24_hw`,`24_score`) values (34,'RESPONSE10-6-2017.docx',NULL,'1.cpp',8,NULL,NULL,NULL,NULL,NULL,NULL,'corrections.doc',NULL);

/*Table structure for table `sfd_course` */

CREATE TABLE `sfd_course` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `period_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `university_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `sfd_course` */

insert  into `sfd_course`(`id`,`code`,`name`,`period_id`,`teacher_id`,`university_id`) values (5,'sfd2017015','Introduction to Internet Technologies and Web Programming',2,2,'sfd');
insert  into `sfd_course`(`id`,`code`,`name`,`period_id`,`teacher_id`,`university_id`) values (48,'sfd20170148','Angular',2,2,'sfd');
insert  into `sfd_course`(`id`,`code`,`name`,`period_id`,`teacher_id`,`university_id`) values (50,'sfd20170150','Java 101',2,2,'sfd');
insert  into `sfd_course`(`id`,`code`,`name`,`period_id`,`teacher_id`,`university_id`) values (57,NULL,'zxcv',NULL,2,'sfd');

/*Table structure for table `sfd_enrollment` */

CREATE TABLE `sfd_enrollment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_enrollment` (`course_id`,`student_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

/*Data for the table `sfd_enrollment` */

insert  into `sfd_enrollment`(`id`,`course_id`,`student_id`) values (2,5,34);
insert  into `sfd_enrollment`(`id`,`course_id`,`student_id`) values (1,48,1);
insert  into `sfd_enrollment`(`id`,`course_id`,`student_id`) values (3,50,34);

/*Table structure for table `sfd_student` */

CREATE TABLE `sfd_student` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sfd_student` */

insert  into `sfd_student`(`id`,`name`,`pwd`) values (1,'Elsa Tobin','elsa');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (2,'Peter Stone','peter');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (3,'Robert Wilson','robert');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (4,'Sadie Wilder','sadie');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (5,'John Danny','john');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (6,'Jack Kaur','jack');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (7,'Charles Thomas','charles');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (8,'Isobel Harris','isobel');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (9,'Donovan Mack','donovan');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (10,'Lexi Rosales','lexi');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (11,'Lucas Lawson','lucas');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (12,'Louis Chapman','louis');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (13,'Jayde Lee','jayde');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (14,'Gunnar Wiggins','gunnar');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (15,'Ethan Joyner','ethan');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (16,'Erik Campbell','erik');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (17,'Grace Morgan','grace');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (18,'Emilia Rees','emilia');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (19,'Luna Bernard','luna');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (20,'Jamie Graham','jamie');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (21,'Daniel Lynn','daniel');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (22,'Adriel Myers','adriel');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (23,'Camryn Hancock','camryn');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (24,'Tatiana Gutierrez','tatiana');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (25,'Rosalie Pollard','rosalie');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (26,'Ellis Adams','ellis');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (27,'Keegan Clayton','keegan');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (28,'John Reid','john');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (29,'Alexa Vance','alexa');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (30,'Maria May','maria');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (31,'Louis Reynolds','louis');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (33,'Todd Ruiz','todd');
insert  into `sfd_student`(`id`,`name`,`pwd`) values (34,'Eliza Mayer','eliza');

/*Table structure for table `teacher` */

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `university` varchar(20) DEFAULT NULL,
  `department` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `pwd` varchar(50) DEFAULT NULL,
  `allowed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (32,'Abby Riley','sfd',NULL,'abby.R@outlook.com','abby',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (14,'Ana Mitchell','sfd',NULL,'ana.M@bulletmail.com','ana',1);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (16,'Bobby Chambers','sfd',NULL,'bobby.C@gmail.com','bobby',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (1,'Brinley Sherman','cbg',NULL,'brinley.S@mail.com','brinley',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (2,'Brown Davies','sfd','','brown.D@gmail.com','brown',2);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (20,'Desmond Hodges','cbg',NULL,'desmond.H@gmail.com','desmond',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (38,'Diana Kirby','cbg',NULL,'diana.K@gmail.com','diana',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (36,'Gisselle Medina','cbg',NULL,'gisselle.M@mail.com','gissele',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (40,'Jennifer Brake','cbg','sd','jennifer@me.com','jennifer',1);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (18,'Kaia Rosa','cbg',NULL,'kaia.R@gmail.com','kaia',1);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (22,'Kolten Grimes','sfd',NULL,'kolten.G@outlook.com','kolten',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (12,'Leona Clemons','sfd',NULL,'leona.C@outlook.com','leona',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (28,'Lorelei Joyner','sfd',NULL,'lerelei.J@bulletmail.com','lorelei',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (3,'Libby Robinson','cbg',NULL,'libby.R@protonmail.com','libby',1);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (35,'Maia Alexander','sfd',NULL,'maia.A@me.com','maia',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (10,'Mason Saunders','sfd',NULL,'mason.S@bulletmail.com','mason',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (34,'Reece Harvey','cbg',NULL,'reece.H@mail.com','reece',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (39,'Remington Gomez','sfd',NULL,'remington.G@me.com','remington',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (33,'Ryan Atkinson','cbg',NULL,'ryan.A@mail.com','ryan',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (37,'Sarah Matthews','cbg',NULL,'sarah.M@outlook.com','sarah',1);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (30,'Sariyah Keller','cbg',NULL,'sariyah.K@me.com','sariyah',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (24,'Skylar Carver','cbg',NULL,'skylar.C@outlook.com','skylar',NULL);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (5,'Smith Bill','sfd',NULL,'smith.B@mail.com','smith',1);
insert  into `teacher`(`id`,`name`,`university`,`department`,`email`,`pwd`,`allowed`) values (6,'Terrance Meyers','sfd',NULL,'terrance.M@gmail.com','terrance',NULL);

/*Table structure for table `university` */

CREATE TABLE `university` (
  `code` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `university` */

insert  into `university`(`code`,`name`) values ('cbg','Cambridge University');
insert  into `university`(`code`,`name`) values ('sfd','Stanford University');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
