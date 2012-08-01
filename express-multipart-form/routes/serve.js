
exports.route_serve = function(req, res){

	var  fs   = require('fs') 

	   , path =  req.query.state.path

	   , name = req.query.state.name

	   , contentTypes = {
  			  'aiff': 'audio/x-aiff'
  			, 'arj': 'application/x-arj-compressed'
  			, 'asf': 'video/x-ms-asf'
  			, 'asx': 'video/x-ms-asx'
  			, 'au': 'audio/ulaw'
  			, 'avi': 'video/x-msvideo'
  		        , 'bcpio': 'application/x-bcpio'
  			, 'ccad': 'application/clariscad'
  			, 'cod': 'application/vnd.rim.cod'
  			, 'com': 'application/x-msdos-program'
  			, 'cpio': 'application/x-cpio'
  		        , 'cpt': 'application/mac-compactpro'
  			, 'csh': 'application/x-csh'
  			, 'css': 'text/css'
  			, 'cur': 'image/vnd.microsoft.icon'
  			, 'deb': 'application/x-debian-package'
                        , 'dl': 'video/dl'
  			, 'doc': 'application/msword'
                        , 'drw': 'application/drafting'
                        , 'dvi': 'application/x-dvi'
                        , 'dwg': 'application/acad'
                        , 'dxf': 'application/dxf'
  			, 'dxr': 'application/x-director'
  			, 'etx': 'text/x-setext'
  			, 'ez': 'application/andrew-inset'
  			, 'fli': 'video/x-fli'
  			, 'flv': 'video/x-flv'
  			, 'gif': 'image/gif'
  			, 'gl': 'video/gl'
  			, 'gtar': 'application/x-gtar'
  			, 'gz': 'application/x-gzip'
  			, 'hdf': 'application/x-hdf'
  			, 'hqx': 'application/mac-binhex40'
  			, 'htm': 'text/html'
  			, 'html': 'text/html'
  			, 'ice': 'x-conference/x-cooltalk'
  			, 'ico': 'image/x-icon'
  			, 'ief': 'image/ief'
  			, 'igs': 'model/iges'
  			, 'ips': 'application/x-ipscript'
  			, 'ipx': 'application/x-ipix'
  			, 'jad': 'text/vnd.sun.j2me.app-descriptor'
  			, 'jar': 'application/java-archive'
  			, 'jpeg': 'image/jpeg'
  			, 'jpg': 'image/jpeg'
  			, 'js': 'text/javascript'
  			, 'json': 'application/json'
  			, 'latex': 'application/x-latex'
  			, 'lsp': 'application/x-lisp'
  			, 'lzh': 'application/octet-stream'
  			, 'm': 'text/plain'
  			, 'm3u': 'audio/x-mpegurl'
  			, 'man': 'application/x-troff-man'
  			, 'manifest': 'text/cache-manifest'
  			, 'me': 'application/x-troff-me'
  			, 'midi': 'audio/midi'
  			, 'mif': 'application/x-mif'
  			, 'mime': 'www/mime'
  			, 'movie': 'video/x-sgi-movie'
  			, 'mp4': 'video/mp4'
  			, 'mpg': 'video/mpeg'
  			, 'mpga': 'audio/mpeg'
  			, 'ms': 'application/x-troff-ms'
  			, 'nc': 'application/x-netcdf'
  			, 'oda': 'application/oda'
  			, 'odi': 'application/vnd.oasis.opendocument.image'
  			, 'odt': 'application/vnd.oasis.opendocument.text'
  			, 'odg': 'application/vnd.oasis.opendocument.graphics'
  			, 'odp': 'application/vnd.oasis.opendocument.presentation'
  			, 'ods': 'application/vnd.oasis.opendocument.spreadsheet'
  			, 'ogm': 'application/ogg'
  			, 'pbm': 'image/x-portable-bitmap'
  			, 'pdf': 'application/pdf'
  			, 'pgm': 'image/x-portable-graymap'
  			, 'pgn': 'application/x-chess-pgn'
  			, 'pgp': 'application/pgp'
  			, 'pm': 'application/x-perl'
  			, 'png': 'image/png'
  			, 'pnm': 'image/x-portable-anymap'
  			, 'ppm': 'image/x-portable-pixmap'
  			, 'ppz': 'application/vnd.ms-powerpoint'
  			, 'pre': 'application/x-freelance'
  			, 'prt': 'application/pro_eng'
  			, 'ps': 'application/postscript'
  			, 'qt': 'video/quicktime'
  			, 'ra': 'audio/x-realaudio'
  			, 'rar': 'application/x-rar-compressed'
  			, 'ras': 'image/x-cmu-raster'
  			, 'rgb': 'image/x-rgb'
  			, 'rm': 'audio/x-pn-realaudio'
  			, 'rpm': 'audio/x-pn-realaudio-plugin'
  			, 'rtf': 'text/rtf'
  			, 'rtx': 'text/richtext'
  			, 'scm': 'application/x-lotusscreencam'
  			, 'set': 'application/set'
  			, 'sgml': 'text/sgml'
  			, 'sh': 'application/x-sh'
  			, 'shar': 'application/x-shar'
  			, 'silo': 'model/mesh'
  			, 'sit': 'application/x-stuffit'
  			, 'skt': 'application/x-koan'
  			, 'smil': 'application/smil'
  			, 'snd': 'audio/basic'
  			, 'sol': 'application/solids'
  			, 'spl': 'application/x-futuresplash'
  			, 'src': 'application/x-wais-source'
  			, 'stl': 'application/SLA'
  			, 'stp': 'application/STEP'
  			, 'sv4cpio': 'application/x-sv4cpio'
  			, 'sv4crc': 'application/x-sv4crc'
  			, 'svg': 'image/svg+xml'
  			, 'swf': 'application/x-shockwave-flash'
  			, 'sxw': 'application/vnd.sun.xml.writer'
 			, 'sxc': 'application/vnd.sun.xml.calc'
  			, 'sxd': 'application/vnd.sun.xml.draw'
 			, 'sxi': 'application/vnd.sun.xml.impress'
			, 'tar': 'application/x-tar'
 			, 'tcl': 'application/x-tcl'
 			, 'tex': 'application/x-tex'
 			, 'texinfo': 'application/x-texinfo'
 			, 'tgz': 'application/x-tar-gz'
 			, 'tiff': 'image/tiff'
 			, 'tr': 'application/x-troff'
 			, 'tsi': 'audio/TSP-audio'
 			, 'tsp': 'application/dsptype'
 			, 'tsv': 'text/tab-separated-values'
 			, 'txt': 'text/plain'
 			, 'unv': 'application/i-deas'
  			, 'ustar': 'application/x-ustar'
 			, 'vcd': 'application/x-cdlink'
 			, 'vda': 'application/vda'
 			, 'vivo': 'video/vnd.vivo'
 			, 'vrm': 'x-world/x-vrml'
			, 'wav': 'audio/x-wav'
 			, 'wax': 'audio/x-ms-wax'
 			, 'wma': 'audio/x-ms-wma'
 			, 'wmv': 'video/x-ms-wmv'
 			, 'wmx': 'video/x-ms-wmx'
 			, 'wrl': 'model/vrml'
 			, 'wvx': 'video/x-ms-wvx'
 			, 'xbm': 'image/x-xbitmap'
 			, 'xlw': 'application/vnd.ms-excel'
 			, 'xml': 'text/xml'
			, 'xpm': 'image/x-xpixmap'
 			, 'xwd': 'image/x-xwindowdump'
			, 'xyz': 'chemical/x-pdb'
			, 'zip': 'application/zip'
	   }

 	 , charsets = {
  		        'text/javascript': 'UTF-8'
  		      , 'text/html': 'UTF-8'
	   }

	 , extension = path.split('.').pop()

         , contentType = contentTypes[extension]

         , charset = charsets[contentType];


	if (charset) contentType += '; charset=' + charset;

	fs.readFile(path, 'binary', function(err, file) {

		if (err) {

			res.writeHead(500, {'Content-Type': 'text/plain'});

      			res.write(err + "\n");

      			res.end();		

		} else {

			res.writeHead(200, {
				             'Content-Type': contentType
					   , 'Content-disposition': 'attachment; filename=' + name
			});

      			res.write(file, 'binary');

      			res.end();
		}
	});
};
