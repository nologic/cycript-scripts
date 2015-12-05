@import com.tyilo.utils; 0

(function(exports) {
	exports.exec_cmd = function (cmd, cmd_args) {
		pid = [[NSProcessInfo processInfo] processIdentifier];
		pipe = [NSPipe pipe];
		file = pipe.fileHandleForReading;

		task = [[NSTask alloc] init];
		task.launchPath = cmd;
		task.arguments = cmd_args;
		task.standardOutput = pipe;

	    file = [pipe fileHandleForReading];

	    [task launch];

	    data = [file readDataToEndOfFile];

	    string = [[NSString alloc] initWithData: data encoding: 4];

	    return string;
	};

	exports.touch_view = function(view) {
		xy = [view convertPoint:[view bounds].origin toView: nil];

		exports.exec_cmd("/usr/bin/stouch", ["touch", "" + xy.x, "" + xy.y]);

		return xy;
	};

	exports.find_locations = function(views, sortbyy = true) {
		return views.map(function(view) {
			return {
				loc: [view convertPoint:[view bounds].origin toView: nil],
				view: view
			};
		}).sort(function(v1, v2) {
			if(sortbyy) {
				return v1.loc.y - v2.loc.y;
			} else {
				return v1.loc.x - v2.loc.x;
			}
		})
	};

	exports.find_by_text = function(txt) {
		return utils.find_subviews(x => x.text.toLowerCase().indexOf(txt.toLowerCase()));
	}

})(exports);

