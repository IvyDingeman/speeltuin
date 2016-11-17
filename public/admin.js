function changePage() {
      if (document.getElementsByClassName('current-page')[0]) {
        document.getElementsByClassName('current-page')[0].className = ''
      }

      const page = window.location.href.split('#')[1]
      switch (page) {
        case 'home': return renderHome()
        case 'users': return renderUsers()
        case 'scores': return renderScores()
        case 'playsets': return renderPlaysets()
        case 'questions': return renderQuestions()
        case 'answers': return renderAnswers()
        default: return renderHome()
      }
    }

    function renderHome() {
      document.getElementById('pagecontent').innerHTML = '<h1>Welkom!</h1>'
    }

    function renderUsers() {
      fetch('/api/user')
      .then(res => res.json())
      .then(users => renderTable('Users', ['username', '_id'], users, ['username', 'password', 'fingerprint']))
    }

    function renderScores() {
      fetch('/api/score')
      .then(res => res.json())
      .then(scores => renderTable('Scores', ['playset', 'user', 'score', 'timestamp', '_id'], scores, ['playset', 'user', 'score', 'timestamp']))
    }

    function renderPlaysets() {
      fetch('/api/playset')
      .then(res => res.json())
      .then(playsets => renderTable('Playsets', ['name', '_id'], playsets, ['name']))
    }

    function renderQuestions() {
      fetch('/api/question')
      .then(res => res.json())
      .then(playsets => renderTable('Questions', ['question', 'correct_answer', '_id'], playsets, ['question', 'correct_answer']))
    }

    function renderAnswers() {
      fetch('/api/answer')
      .then(res => res.json())
      .then(answers => renderTable('Answers', ['user', 'question', 'answer', 'timestamp', '_id'], answers, ['user', 'question', 'answer', 'timestamp']))
    }

    function removeItem(id, model) {
      if (!model) {
        const page = window.location.href.split('#')[1]

        switch (page) {
          case 'users': return removeItem(id, 'user')
          case 'scores': return removeItem(id, 'score')
          case 'playsets': return removeItem(id, 'playset')
          case 'questions': return removeItem(id, 'question')
          case 'answers': return removeItem(id, 'answer')
          default: return null
        }
      } else {
        fetch(new Request(`/api/${model}/${id}`, {method: 'delete'}))
        .then(res => changePage())
      }
    }

    function create(formfields, model) {

      if (!model) {
        const page = window.location.href.split('#')[1]

        switch (page) {
          case 'users': return create(formfields, 'user')
          case 'scores': return create(formfields, 'score')
          case 'playsets': return create(formfields, 'playset')
          case 'questions': return create(formfields, 'question')
          case 'answers': return create(formfields, 'answer')
          default: return null
        }
      } else {
        formfields = formfields.split(',')
        let newItem = {}

        formfields.forEach((f, i) => {
          newItem[formfields[i]] = document.getElementById(f).value
        })

        $.ajax({
          url: `/api/${model}`,
          type: "POST",
          data: JSON.stringify(newItem),
          contentType: "application/json",
          complete: changePage
        });
      }
    }

	function escapeHtml(unsafe) {
		return typeof unsafe !== 'string' ? unsafe : unsafe
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}

    function renderTable(name, fields, docs, formfields) {
      document.getElementById('pagecontent').innerHTML = `
      <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>${name}</h3>
              </div>
            </div>

            <div class="clearfix"></div>

            <div class="row">

              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_content">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="card-box table-responsive">
                          <h4>Create new:</h4>
                          <form>
                            <div class="form-group">
                              ${formfields.map(f => `<label style="width: 150px;">${f}</label> <input type="text" id="${f}"><br> `).join('')}
                              <br><br>
                              <button type="button" onclick="create('${formfields}')" class="btn btn-default">submit</button>
                            </div>
                          </form>
                          <table id="datatable-keytable" class="table table-striped table-bordered">
                            <thead>
                              <tr>
                                ${fields.map(f => `<th>${f}</th>`).join('')}
                                <th><i class="fa fa-remove"></i> remove</th>
                              </tr>
                            </thead>


                            <tbody>
                              ${docs.map(d => `<tr>
                                ${fields.map(f => `<td>${escapeHtml(d[f])}</td>`).join('')}
                                <td onclick="removeItem('${d._id}')" style="cursor: pointer"><i class="fa fa-remove" style="color: red"></i></td>
                              </tr>`).join('')}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      `
    }
