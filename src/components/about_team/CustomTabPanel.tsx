import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin:"auto",
    
    
    
    
    
  };

  const headingStyle = {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '10px',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1em',
    color: '#666',
    marginBottom: '8px',
    overflowY: 'auto',
  };
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box 
    sx={{
      flexGrow: 1,
      
      bgcolor: 'background.paper',
      display: ['block', 'flex'], // display: block на экранах меньше 600px, display: flex на экранах больше 600px
      '@media (max-width: 950px)': {
        display: 'block', // display: block на экранах меньше 950px
        
       
      },
   }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider','@media (max-width: 950px)': {
          display:"flex",
          justifyContent:"center",
          alignItems:'center',
          marginTop:"30px",
          overflowX:"auto"
        }, }}
      >
        
        <Tab label="Михайлов Алексей" {...a11yProps(0)} />
        <Tab label="Кирилл Шаповалов" {...a11yProps(1)} />
        <Tab label="Тимур Анонимус" {...a11yProps(2)} />
        <Tab label="Владислав Леонов" {...a11yProps(3)} />
        <Tab label="Никита Анонимус" {...a11yProps(4)} />
        <Tab label="Андрей Турлушкин" {...a11yProps(5)} />
        <Tab label="Андрей Глагольев" {...a11yProps(6)} />
        <Tab label="Денис Малахиев" {...a11yProps(7)} />
        <Tab label="Степан Анонимус" {...a11yProps(8)} />
        <Tab label="Максим Попов" {...a11yProps(9)} />

        
      </Tabs>
      <TabPanel value={value} index={0}>
     
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores provident omnis aliquid aliquam saepe voluptate vero? Sed nihil ratione deleniti laudantium molestiae eius eum fugiat neque facilis! Recusandae, maxime labore!
        
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dewqeqeqwolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={6}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={7}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={8}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={9}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={10}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={11}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={12}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={13}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      <TabPanel value={value} index={14}>
      <div style={containerStyle}>
        <div className='img-info' style={{ marginLeft:"auto",marginRight:"auto",justifyContent:"center",display:"flex",marginBottom:"20px"}}>
        <img src="../src/assets/image_auth.jpg" alt="Person" style={{ width: '150px', height: '150px', borderRadius: '50%',}} />
        </div>
      
      <h3 style={headingStyle}>Информация о человеке:</h3>
      <p style={paragraphStyle}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quibusdam veniam iusto magnam molestias
        voluptas possimus omnis, similique, rerum debitis sint fugiat hic alias aspernatur ex, in eos quos itaque?
      </p>
      <p style={paragraphStyle}>
        Ссылка на ВК: <a href="https://vk.com/">Ваша ссылка</a>
      </p>
      <p style={paragraphStyle}>Никнейм в Телеграм: @ваш_никнейм</p>
      
    </div>
      </TabPanel>
      
      
    </Box>
  );
}

function setValue(newValue: number) {
  throw new Error('Function not implemented.');
}
