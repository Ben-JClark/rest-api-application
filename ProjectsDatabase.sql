CREATE TABLE IF NOT EXISTS `projects` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `projectname` varchar(255) NOT NULL,
  `projectdesc` varchar(255) NOT NULL,
  `startdate` varchar(255) NOT NULL,
  `enddate`  varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `projects` (`id`, `projectname`, `projectdesc`, `startdate`, `enddate`) 
VALUES (NULL, 'CRM System', 'CRM (Customer Relationship Management) systems help businesses organize relationships with their customers.',
'2021-02-01 08:00', '2021-09-30 09:00');

INSERT INTO `projects` (`id`, `projectname`, `projectdesc`, `startdate`, `enddate`) 
VALUES (NULL, 'Heritage New Zealand\'s Archaeological Reports Digital Library', 'A Greenstone Digital Library project providing access to Heritage New Zealand\'s PDF-based Archaeological Report, available through https://www.heritage.org.nz/protecting-heritage/archaeology/digital-library',
'2022-01-01 09:00', '2022-01-31 24:00');

INSERT INTO `projects` (`id`, `projectname`, `projectdesc`, `startdate`, `enddate`) 
VALUES (NULL, 'Local Charity Goods Alerting System', 'A mobile app that allows users to register for items they are looking for (such as a stroller), and be alerted when good come in that match the description.',
'2022-02-01 01:00', '2023-02-28 01:00');

INSERT INTO `projects` (`id`, `projectname`, `projectdesc`, `startdate`, `enddate`) 
VALUES (NULL, 'Hey There, Interact with Me!', 'A WebSocket based system designed to allow users to control displays in public spaces such as museums and airports using their phones.',
'2020-07-09 07:00', '2021-01-31 10:00');

INSERT INTO `projects` (`id`, `projectname`, `projectdesc`, `startdate`, `enddate`) 
VALUES (NULL, 'E-Commerce Website for Visually Impaired', 'An ecommerce website is developed to assist blind people that automatically recognizes clothing patterns and colours.',
'2022-01-01 12:00', '2022-05-05 12:00');