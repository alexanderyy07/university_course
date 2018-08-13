class COpenGLSphere {
	var ID: Int16
	var x, y, z: Float
	var Vx, Vy, Vz: Float
	var Fx, Fy, Fz: Float
	var thetax, theaty, theatz: Float
	var rad: Float
	var rho: Float
	var press: Float

	func Velocity() -> Double {
		return 6.7
	}
	func DrawSphere() {}
}

class PositionModel {
//	CTypedPtrArray <CObArray, COpenGLBoundary*> m_boundArray;
//    CTypedPtrArray <CObArray, COpenGLArcBoundary*> m_arcboundArray;
	var m_maxstep: Int
	var m_nballs, m_nellipses = Int()[];
	var TraPoints: Int
	var trajectory_created: Int
	var m_id_max: Int
	var m_step: Int
	var m_fps: Int
	var m_press_min, m_press_max, m_timer, m_speed_max, m_rho_min, m_rho_max: Double
	var m_balls, m_positions:COpenGLSphere[]();
//    COpenGLEllipse *m_ellipses;
	var m_BodiesLoaded : Bool
	var fPos, ftra:File
//	COLORREF m_color;
    var m_press_min_step: Double
    var m_press_max_step: Double
    var m_speed_max_step: Double
//    Vect *m_paths;
    var m_Nselected: Int;
//    int *m_Selected;

    func GetNumberOre() -> Int {};
    func GetNumberWaste() -> Int {};
    var filename = "test position.pos";

    func OpenFile() {
    	let fileHandle = try FileHandle(forReadingFrom: URL(fileURLWithPath: "/test position.pos"))
    	m_press_min = fileHandle.readData(ofLength: sizeof(Double.self))
    	m_press_max = fileHandle.readData(ofLength: sizeof(Double.self))
    	m_maxstep = fileHandle.readData(ofLength: sizeof(Int.self))

    	m_nballs[0] = fileHandle.readData(ofLength: sizeof(Int.self))
    	m_timer = fileHandle.readData(ofLength: sizeof(Double.self))

    //	m_balls = new COpenGLSphere[m_nballs[0]];
    	for var i=0; i <m_nballs[0]; i++ {
    		m_balls[i] = fileHandle.readData(ofLength: sizeof(COpenGLSphere.self))
    	}
    	m_BodiesLoaded = true;
    	defer { fileHandle.closeFile()}
    }

    func LoadStep(step:Int) {
    	if step == -1 {
    		step = m_maxstep - 1
    	}
    	if step == m_maxstep {
    		step = 0
    	}

    	let fileHandle = try FileHandle(forReadingFrom: URL(fileURLWithPath: "/test position.pos"))
    	m_press_min = fileHandle.readData(ofLength: sizeof(Double.self))
    	m_press_max = fileHandle.readData(ofLength: sizeof(Double.self))
    	m_maxstep = fileHandle.readData(ofLength: sizeof(Int.self))

    	for var i=0; i<step; i++ {
	    	m_nballs[i] = fileHandle.readData(ofLength: sizeof(Int.self))
  	  		m_timer = fileHandle.readData(ofLength: sizeof(Double.self))
  	//  		fpos.Seek(m_nballs[i]*sizeof(COpenGLSphere), CFile::current);
   		}

    	if m_BodiesLoaded {
    		m_nballs[step] = fileHandle.readData(ofLength: sizeof(Int.self))
  	  		m_timer = fileHandle.readData(ofLength: sizeof(Double.self))

/*
  	  		if (m_balls) {
            delete [] m_balls
        }
        
        m_balls = new COpenGLSphere[m_nballs[step]];*/
  	  		for var i=0; i <m_nballs[0]; i++ {
	    		m_balls[i] = fileHandle.readData(ofLength: sizeof(COpenGLSphere.self))
	    	}
    	}

    	m_step = step

    	m_press_max_step = 0.0
    	m_press_min_step = 0.0
    	m_speed_max_step = 0.0
    	
    	for var i=0; i<m_nballs[step]; i++ {
	    	if m_press_min_step < m_nballs[i].press {
	    		m_press_min_step = m_balls[i].press
	    	}
	    	if m_press_max_step > m_nballs[i].press {
	    		m_press_max_step = m_balls[i].press
	    	}
	    	if m_speed_max_step > m_nballs[i].Velocity() {
	    		m_speed_max_step = m_balls[i].Velocity()
	    	}
  	//  		fpos.Seek(m_nballs[i]*sizeof(COpenGLSphere), CFile::current);
   		}
    	defer { fileHandle.closeFile()}
    }
}
